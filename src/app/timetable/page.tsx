'use client'

import { useState, useEffect } from "react"
import { Select, Divider, notification, Button } from "antd"
import type { NotificationArgsProps } from 'antd';

import Schedule from "@/components/schedule"
import { ScheduleEvent, SelectData, ModuleMetaData, ModuleData, ScheduleData } from "@/utils/types"
import { deleteIcon } from "@/utils/icons"
import { CalculateGridRow } from "@/utils/commonFunction"
import FetchModuleList from "@/api/FetchModuleList"
import FetchModuleData from "@/api/FetchModuleData";

const colors: string[] = ["blue", "green", "yellow", "purple", "indigo", "gray", "lime", "emerald", "teal", "cyan", "pink"]
type NotificationPlacement = NotificationArgsProps['placement']

export default function Timetable() {
    const [selectedIndex, setSelectedIndex] = useState<ScheduleEvent[]>([])
    const [selectedEvents, setSelectedEvents] = useState<Map<string, ScheduleEvent[]>>(new Map())
    const [selectedModules, setSelectedModules] = useState<ModuleData[]>([])
    const [userModule, setUserModule] = useState<string>("")
    const [dropdownValue, setDropdownValue] = useState<SelectData | null | undefined>(null)
    const [moduleList, setModuleList] = useState<SelectData[]>([])
    const [defaultValues, setDefaultValues] = useState<Map<string, SelectData[]>>(new Map())
    const [colourMap, setColourMap] = useState<Map<string, string>>(new Map())
    const [colourIndex, setColourIndex] = useState<number>(0)
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moduleListData: ModuleMetaData[] = await FetchModuleList("2023_2")
                moduleListData.sort((a,b) => a.code.localeCompare(b.code))
                const listOfModules: SelectData[] = Object.values(moduleListData).map((item) => ({
                    value: item.code,
                    label: item.code + " " + item.module
                }))
                setModuleList(listOfModules)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const allEvents: ScheduleEvent[] = Array.from(selectedEvents.values()).reduce((acc, current) => { return acc.concat(current)}, [])
        const clashMap: Map<string, ScheduleEvent[]> = new Map()
        allEvents.forEach(events => {
            if (clashMap.has(events.DayOfWeek)) {
                const dayList: ScheduleEvent[] = clashMap.get(events.DayOfWeek)!
                var overlap: boolean = false
                for (let i = 0; i < dayList.length; i++) {
                    const result = checkClash(events, dayList[i])
                    if ((result === "clash") || (result === "overlap")) {
                        dayList[i].BgColour = result === "clash" ? "red" : "white"
                        dayList[i].GridRow = CalculateGridRow(getStartTime(dayList[i].StartTime, events.StartTime), getEndTime(dayList[i].EndTime, events.EndTime))
                        dayList[i].ClashData = [
                            {Code: dayList[i].Code!, Index: dayList[i].Index, ClassType: dayList[i].ClassType, IndexGroup: dayList[i].IndexGroup, StartTime: dayList[i].StartTime, EndTime: dayList[i].EndTime, Remarks: dayList[i].Remarks},
                            {Code: events.Code!, Index: events.Index, ClassType: events.ClassType, IndexGroup: events.IndexGroup, StartTime: events.StartTime, EndTime: events.EndTime, Remarks: events.Remarks}
                        ]
                        overlap = true
                        if (result === "clash") {
                            openNotification('topRight',dayList[i].Code!, events.Code!, events.DayOfWeek)
                        }
                        break
                    }
                }
                if (!overlap) {
                    events.BgColour = getColour(events.Code!)
                    events.GridRow = CalculateGridRow(events.StartTime, events.EndTime)
                    events.ClashData = undefined
                    dayList.push(events)
                }
                clashMap.set(events.DayOfWeek, dayList)
            } else {
                events.BgColour = getColour(events.Code!)
                events.GridRow = CalculateGridRow(events.StartTime, events.EndTime)
                events.ClashData = undefined
                clashMap.set(events.DayOfWeek, [events])
            }
        })
        setSelectedIndex(Array.from(clashMap.values()).reduce((acc, current) => { return acc.concat(current)}, []))
    }, [selectedEvents])

    const handleSelectModule = () => {
        const fetchModuleData = async () => {
            try {
                // getting the new modules
                const data: ModuleData = await FetchModuleData("2023_2", userModule)

                setSelectedModules(prevList => [...prevList, data])

                // setting default values
                const uniqueIndexMap: Map<string, SelectData> = new Map()
                data.schedule.forEach(schedule => {
                    const key = `${schedule.index}_${schedule.index}`
                    uniqueIndexMap.set(key, { value: schedule.index, label: schedule.index })
                })
                const uniqueIndexList: SelectData[] = Array.from(uniqueIndexMap.values())

                setDefaultValues(prevState => {
                    const newMap = new Map(prevState)
                    newMap.set(data.code, uniqueIndexList)
                    return newMap
                })

                // setting indexes for events
                const eventList: ScheduleEvent[] = getIndex(data, uniqueIndexList[0].label)
                setSelectedEvents(prevState => {
                    const newMap = new Map(prevState)
                    newMap.set(data.code, eventList)
                    return newMap
                })
            } catch (error) {
                console.log('Error fetching module data:', error)
            }
        }
        if (userModule !== "") {
            fetchModuleData()
            setUserModule("")
            setDropdownValue(null)
        }
    }

    const handleDelete = (moduleCode: string) => {
        setSelectedModules(selectedModules.filter(module => module.code !== moduleCode))

        setDefaultValues(prevState => {
            const newMap = new Map(prevState)
            newMap.delete(moduleCode)
            return newMap
        })

        setSelectedEvents(prevState => {
            const newMap = new Map(prevState)
            newMap.delete(moduleCode)
            return newMap
        })
    }

    const handleSelectIndex = (moduleCode: string, index: string) => {
        const selectedModuleData: ModuleData = selectedModules.find(module => module.code === moduleCode)!
        const eventList: ScheduleEvent[] = getIndex(selectedModuleData, index)
        const newMap = new Map(selectedEvents)
        newMap.set(moduleCode, eventList)
        setSelectedEvents(newMap)
    }

    const handleDropdown = (option: SelectData) => {
        setUserModule(option.toString())
        setDropdownValue(option)
    }

    const openNotification = (placement: NotificationPlacement, first: string, second: string, day: string) => {
        api.error({
            message: "Clash in index!",
            description: `There is a clash in index between ${first} and ${second} on ${day}`,
            duration: 10,
            placement,
        });
    };

    const getIndex = (data: ModuleData, index: string) => {
        var eventList: ScheduleEvent[] = []
        data.schedule.map((eventSchedule) => {
            if (eventSchedule.index === index) {
                const newEvent: ScheduleEvent = {
                    Code: data.code,
                    Index: eventSchedule.index,
                    ClassType: eventSchedule.classType,
                    IndexGroup: eventSchedule.indexGroup,
                    StartTime: eventSchedule.startTime,
                    EndTime: eventSchedule.endTime,
                    Remarks: [{ Venue: eventSchedule.venue, Remarks: eventSchedule.remarks.replace("Teaching ", "") }],
                    DayOfWeek: eventSchedule.dayOfWeek,
                    GridRow: CalculateGridRow(eventSchedule.startTime, eventSchedule.endTime),
                    BgColour: getColour(data.code),
                    TeachingWeeks: eventSchedule.teachingWeeks
                }
                let found: boolean = false
                for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].ClassType === newEvent.ClassType && eventList[i].DayOfWeek === newEvent.DayOfWeek && eventList[i].StartTime === newEvent.StartTime && eventList[i].EndTime === newEvent.EndTime) {
                        eventList[i].Remarks.push(...newEvent.Remarks)
                        found = true
                    }
                }
                if (!found) {
                    eventList.push(newEvent)
                }
            }
        })
        return eventList
    }

    const getColour = (code: string) => {
        if (colourMap.has(code)) {
            return colourMap.get(code)!
        }
        else {
            const newColour: string = colors[colourIndex]
            if (colourIndex < 10) {
                setColourIndex(colourIndex+1)
            }
            else {
                setColourIndex(0)
            }
            const newMap = new Map(colourMap)
            newMap.set(code, newColour)
            setColourMap(newMap)
            return newColour
        }
    }

    const getStartTime = (curStart: string, newStart: string) => {
        if (parseInt(curStart) < parseInt(newStart)) {
            return curStart
        } else {
            return newStart
        }
    }

    const getEndTime = (curEnd: string, newEnd: string) => {
        if (parseInt(curEnd) > parseInt(newEnd)) {
            return curEnd
        } else {
            return newEnd
        }
    }

    const checkClash = (newEvent: ScheduleEvent, curEvent: ScheduleEvent) => {
        const newStart: number = parseInt(newEvent.StartTime)
        const newEnd: number = parseInt(newEvent.EndTime)
        const curStart: number = parseInt(curEvent.StartTime)
        const curEnd: number = parseInt(curEvent.EndTime)

        if ((newStart >= curStart && newStart < curEnd) || (curStart >= newStart && curStart < newEnd)) {
            const intersectionWeeks: number[] = newEvent.TeachingWeeks!.filter(week => curEvent.TeachingWeeks!.includes(week))
            if (newEvent.TeachingWeeks?.length === 0 || curEvent.TeachingWeeks?.length === 0 ) {
                return "clash"
            } else if (intersectionWeeks.length === 0) {
                return "overlap"
            } else {
                return "clash"
            }
        } else {
            return "No clash"
        }
    }

    const getSelectOptions = (scheduleDataList: ScheduleData[]) => {
        const uniqueMap: Map<string, SelectData> = new Map()
        scheduleDataList.forEach(schedule => {
            const key = `${schedule.index}_${schedule.index}`
            uniqueMap.set(key, { value: schedule.index, label: schedule.index })
        })
        return Array.from(uniqueMap.values())
    }

    const filterOption = (input: string, option?: { label: string; value: string }) => 
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return(
        <>
            {contextHolder}
            <div className="w-full h-full flex flex-row">
                <div className="w-[80%] h-full pr-4">
                    <Schedule events={selectedIndex} />
                </div>
                <div className="w-[20%] h-full">
                    <div className="w-full">
                        <Select
                            className="w-full mb-2"
                            showSearch
                            placeholder="Input module"
                            value={dropdownValue}
                            onChange={handleDropdown}
                            filterOption={filterOption}
                            options={moduleList}
                        />
                        <Button className="bg-blue-800 text-white w-full" onClick={handleSelectModule}>Add</Button>
                        <div className="pt-4">
                            <h1 className="pb-2">Modules Added: </h1>
                            {
                                selectedModules.length === 0 &&
                                <h1 className="text-slate-500 italic">No modules selected</h1>
                            }
                            {selectedModules.map((module,index) => (
                                <div key={index} className="flex flex-row items-center justify-between pb-2">
                                    <h1>{module.code}</h1>
                                    <Select 
                                        defaultValue={defaultValues.get(module.code)![0].label}
                                        options={getSelectOptions(module.schedule)}
                                        onChange={(selectedOption) => handleSelectIndex(module.code, selectedOption)}
                                    />
                                    <div className="hover:cursor-pointer" onClick={() => {handleDelete(module.code)}}>{deleteIcon}</div>
                                </div>
                            ))}
                        </div>
                        <Divider />
                        <div>
                            <h1 className="pb-2">Exam Schedules: </h1>
                            <table className="table-fixed mt-4 border-collapse border border-gray-200">
                                <tbody>
                                    {selectedModules.map((exam,index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-400 px-4 py-2 text-sm">{exam.code}</td>
                                            <td className="w-full border border-gray-400 px-4 py-2 text-sm">{exam.exam.date === "" ? "N/A" : `${exam.exam.date} (${exam.exam.dayOfWeek}), ${exam.exam.time} (${exam.exam.duration})`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}