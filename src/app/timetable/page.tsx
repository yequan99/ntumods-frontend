'use client'

import { useState, useEffect } from 'react'
import { Select, Divider, notification, Button } from "antd"
import type { NotificationArgsProps } from 'antd';

import { ScheduleEvent, SelectData, ModuleMetaData, SelectedModuleData, ModuleData, ScheduleData, StoreModuleData, TimetableStorageData } from '@/utils/types'
import Schedule from '@/components/schedule'
import FetchModuleList from '@/api/FetchModuleList'
import FetchModuleData from '@/api/FetchModuleData'
import { CalculateGridRow } from '@/utils/commonFunction'
import { deleteIcon } from "@/utils/icons"

const colours: string[] = ["blue", "green", "yellow", "purple", "indigo", "gray", "lime", "emerald", "teal", "cyan"]
type NotificationPlacement = NotificationArgsProps['placement']

const getLocalStorage = () => {
    if (typeof window !== undefined) {
        const serializedTimetableData = window.localStorage.getItem('timetable')
        if (serializedTimetableData) {
            return JSON.parse(serializedTimetableData) as TimetableStorageData
        }
    }
    return null
}

const setLocalStorage = (storeObject: TimetableStorageData) => {
    if (typeof window !== undefined) {
        window.localStorage.setItem('timetable', JSON.stringify(storeObject))
    }
}

export default function Timetable() {
    const [parsedEvents, setParsedEvents] = useState<ScheduleEvent[]>([])
    const [selectedEvents, setSelectedEvents] = useState<ScheduleEvent[]>([])
    const [moduleList, setModuleList] = useState<SelectData[]>([])
    const [selectedModules, setSelectedModules] = useState<SelectedModuleData[]>([])
    const [selectedDropdown, setSelectedDropdown] = useState<SelectData | null>(null)
    const [colourMap, setColourMap] = useState<Map<string, string>>(new Map())  // need to store in local storage
    const [colourIndex, setColourIndex] = useState<number>(0)   // need to store in local storage
    const [api, contextHolder] = notification.useNotification()

    useEffect(() => {
        const fetchModuleListData = async () => {
            try {
                const moduleListData: ModuleMetaData[] = await FetchModuleList()
                moduleListData.sort((a,b) => a.code.localeCompare(b.code))
                const listOfModules: SelectData[] = Object.values(moduleListData).map((module) => ({
                    value: module.code,
                    label: module.code + " " + module.module
                }))
                setModuleList(listOfModules)
            } catch (error) {
                console.error('Error fetching module list data')
            }
        }
        fetchModuleListData()

        // fetch local storage and load it
        // const savedItems: TimetableStorageData | null = getLocalStorage()
        // console.log("cached: ", savedItems)
        // if (savedItems !== null) {
        //     setColourIndex(savedItems.ColourIndex)
        //     setColourMap(savedItems.ColourMap)
        //     {savedItems.Modules.forEach(module => {
        //         handleSelectModule(module.Code, module.Index)
        //     })}
        // }
    }, [])

    useEffect(() => {
        // handle clash / overlapping index
        const clashMap: Map<string, ScheduleEvent[]> = new Map()
        selectedEvents.forEach(events => {
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
        const ParsedSchedules: ScheduleEvent[] = Array.from(clashMap.values()).reduce((acc, current) => { return acc.concat(current)}, [])
        setParsedEvents(ParsedSchedules)
    }, [selectedEvents])

    const handleSelectModule = (module: SelectData | null, savedIndex?: SelectData) => {
        const fetchModuleData = async () => {
            try {
                // fetching the module data
                const moduleData: ModuleData = await FetchModuleData(module!.toString())
                

                // set selected modules
                const uniqueIndexMap: Map<string, SelectData> = new Map()
                moduleData.schedule.forEach(schedule => {
                    const key = schedule.index
                    uniqueIndexMap.set(key, { value: schedule.index, label: schedule.index })
                })
                const uniqueIndexList: SelectData[] = Array.from(uniqueIndexMap.values())
                
                const selectedModule: SelectedModuleData = {
                    Code: moduleData.code,
                    Title: moduleData.title,
                    SelectedIndex: savedIndex !== undefined ? savedIndex :  uniqueIndexList[0],
                    IndexList: uniqueIndexList,
                    Exam: moduleData.exam,
                    Schedule: moduleData.schedule
                }

                setSelectedModules(prevList => [...prevList, selectedModule])
                
                // set selected events
                const listOfEvents: ScheduleEvent[] = getEvents(selectedModule.Schedule, selectedModule.SelectedIndex.label, selectedModule.Code)
                setSelectedEvents(prevList => [...prevList, ...listOfEvents])
                
                // store in localStorage
                const storeObject: StoreModuleData = { Code: module, Index: savedIndex !== undefined ? savedIndex :  uniqueIndexList[0]}
                const storedData: TimetableStorageData | null = getLocalStorage()

                if (storedData === null) {
                    const storeData: TimetableStorageData = {
                        Modules: [storeObject],
                        ColourIndex: colourIndex,
                        ColourMap: colourMap
                    }
                    setLocalStorage(storeData)
                } else {
                    const index = storedData.Modules.findIndex(item => item.Code === storeObject.Code)
                    if (index !== -1) {
                        storedData.Modules[index] = storeObject
                    } else {
                        storedData.Modules.push(storeObject)
                    }
                    setLocalStorage(storedData)
                }

            } catch (error) {
                console.error('Error fetching module data')
            }
        }
        if (module !== null) {
            let duplicate: boolean = false
            {selectedModules.forEach(mod => {
                if (mod.Code === module!.toString()) {
                    duplicate = true
                }
            })}
    
            if (duplicate === false) {
                fetchModuleData()
                setSelectedDropdown(null)
            }
        }

    }

    const handleDeleteModule = (moduleCode: string) => {
        setSelectedModules(selectedModules.filter(module => module.Code !== moduleCode))
        setSelectedEvents(selectedEvents.filter(events => events.Code !== moduleCode))
        if (selectedModules.length === 1) {
            setColourIndex(0)
        }

        // delete colour map
        const deletedMap = new Map(colourMap)
        deletedMap.delete(moduleCode)
        setColourMap(deletedMap)

        // delete from local storage
        const storedData: TimetableStorageData = getLocalStorage()!
        storedData.ColourMap = deletedMap
        const remainingModules: StoreModuleData[] = storedData.Modules.filter(module => module.Code?.toString() !== moduleCode)
        storedData.Modules = remainingModules
        setLocalStorage(storedData)
    }

    const handleSelectIndex = (moduleCode: string, index: SelectData) => {
        setSelectedModules(prevModules => prevModules.map(module => {
            if (module.Code === moduleCode) {
                return { ...module, SelectedIndex: index }
            }
            return module
        }))

        // update selected events
        const selectedModData: SelectedModuleData = selectedModules.filter(module => module.Code === moduleCode)[0]
        const listOfEvents: ScheduleEvent[] = getEvents(selectedModData.Schedule, index.toString(), moduleCode)
        
        const purgedList: ScheduleEvent[] = selectedEvents.filter(curEvent => curEvent.Code !== moduleCode)
        const newParsedList: ScheduleEvent[] = [...purgedList, ...listOfEvents]
        setSelectedEvents(newParsedList)

        // update local storage
        const storeObject: StoreModuleData = { Code: {label: moduleCode, value: moduleCode}, Index: index }
        const storedData: TimetableStorageData | null = getLocalStorage()!
        const findIndex = storedData!.Modules.findIndex(item => item.Code === storeObject.Code)
        if (findIndex !== -1) {
            storedData.Modules[findIndex] = storeObject
        } else {
            storedData.Modules.push(storeObject)
        }
        setLocalStorage(storedData)
    }

    const getEvents = (schedule: ScheduleData[], index: string, moduleCode: string) => {
        var eventList: ScheduleEvent[] = []
        schedule.map((eventSchedule) => {
            if (eventSchedule.index === index) {
                const newEvent: ScheduleEvent = {
                    Code: moduleCode,
                    Index: eventSchedule.index,
                    ClassType: eventSchedule.classType,
                    IndexGroup: eventSchedule.indexGroup,
                    StartTime: eventSchedule.startTime,
                    EndTime: eventSchedule.endTime,
                    Remarks: [{ Venue: eventSchedule.venue, Remarks: eventSchedule.remarks.replace("Teaching ", "") }],
                    DayOfWeek: eventSchedule.dayOfWeek,
                    GridRow: CalculateGridRow(eventSchedule.startTime, eventSchedule.endTime),
                    BgColour: getColour(moduleCode),
                    TeachingWeeks: eventSchedule.teachingWeeks
                }
                let found: boolean = false
                for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].ClassType === newEvent.ClassType && eventList[i].DayOfWeek === newEvent.DayOfWeek && eventList[i].StartTime === newEvent.StartTime && eventList[i].EndTime === newEvent.EndTime) {
                        eventList[i].Remarks.push(...newEvent.Remarks)
                        const mergedWeeksArray: number[] = eventList[i].TeachingWeeks!.concat(newEvent.TeachingWeeks!)
                        const mergedWeekSet = new Set(mergedWeeksArray)
                        eventList[i].TeachingWeeks = Array.from(mergedWeekSet)
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

    const getColour = (moduleCode: string) => {
        if (colourMap.has(moduleCode)) {
            return colourMap.get(moduleCode)!
        } else {
            const colour: string = colours[colourIndex]
            const newColourMap = new Map(colourMap)
            newColourMap.set(moduleCode, colour)
            setColourMap(newColourMap)
            setColourIndex(colourIndex < 9 ? colourIndex+1 : 0)

            return colour
        }
    }

    const openNotification = (placement: NotificationPlacement, first: string, second: string, day: string) => {
        api.error({
            message: "Clash in index!",
            description: `There is a clash in index between ${first} and ${second} on ${day}`,
            duration: 10,
            placement,
        })
    }

    const filterOption = (input: string, option?: { label: string; value: string }) => 
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <>
            {contextHolder}
            <div className="w-full h-full flex flex-col md:flex-row">
                <div className="w-full md:w-[80%] pr-0 md:pr-4 h-[60%] md:h-full">
                    <Schedule events={parsedEvents} />
                </div>
                <div className="w-full md:w-[20%] h-[40%] md:h-full mt-4 md:mt-0">
                    <div className="w-full">
                        <Select
                            className="w-full mb-2"
                            showSearch
                            value={selectedDropdown}
                            onChange={(option) => setSelectedDropdown(option)}
                            placeholder="Input module"
                            options={moduleList}
                            filterOption={filterOption}
                        />
                        <Button className="bg-blue-800 text-white w-full" onClick={() => handleSelectModule(selectedDropdown)}>Add</Button>
                        <div className="pt-4">
                            <h1 className="pb-2">Modules Added: </h1>
                            {
                            selectedModules.length === 0 ?
                            <h1 className="text-slate-500 italic">No modules selected</h1>
                            :
                            <>
                                {selectedModules.map((module,index) => (
                                    <div key={index} className="flex flex-row items-center justify-between pb-2">
                                        <h1>{module.Code}</h1>
                                        <Select 
                                            defaultValue={module.SelectedIndex}
                                            value={module.SelectedIndex}
                                            options={module.IndexList}
                                            onChange={(selectedOption) => handleSelectIndex(module.Code, selectedOption)}
                                        />
                                        <div className="hover:cursor-pointer" onClick={() => handleDeleteModule(module.Code)}>{deleteIcon}</div>
                                    </div>
                                ))}
                            </>
                        }
                        </div>
                        <Divider />
                        <div>
                            <h1 className="pb-2">Exam Schedules: </h1>
                            <table className="table-fixed mt-4 mb-4 border-collapse border border-gray-200">
                                <tbody>
                                    {selectedModules.map((exam,index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-400 px-4 py-2 text-sm">{exam.Code}</td>
                                            <td className="w-full border border-gray-400 px-4 py-2 text-sm">{exam.Exam.date === "" ? "N/A" : `${exam.Exam.date} (${exam.Exam.dayOfWeek}), ${exam.Exam.time} (${exam.Exam.duration})`}</td>
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