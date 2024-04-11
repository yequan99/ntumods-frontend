'use client'

import { useState, useEffect } from "react"
import { Select, Divider } from "antd"

import Schedule from "@/components/schedule"
import { ScheduleEvent, SelectData, ModuleMetaData, ModuleData, ScheduleData } from "@/utils/types"
import { deleteIcon } from "@/utils/icons"
import { CalculateGridRow } from "@/utils/commonFunction"

export default function Timetable() {
    const [selectedEvents, setSelectedEvents] = useState<Map<string, ScheduleEvent[]>>(new Map())
    const [selectedModules, setSelectedModules] = useState<ModuleData[]>([])
    const [moduleList, setModuleList] = useState<SelectData[]>([])
    const [defaultValues, setDefaultValues] = useState<Map<string, SelectData[]>>(new Map())

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moduleResponse = await fetch('/data/fullData/moduleList.json')
                const moduleListData: ModuleMetaData[] = await moduleResponse.json()
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

    const handleSelectModule = (value: string) => {
        const fetchModuleData = async () => {
            try {
                // getting the new modules
                const response = await fetch(`/data/fullData/moduleData/${value}.json`)
                const data: ModuleData = await response.json()

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
        fetchModuleData()
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

    const getIndex = (data: ModuleData, index: string) => {
        var eventList: ScheduleEvent[] = []
        data.schedule.map((eventSchedule) => {
            if (eventSchedule.index === index) {
                const newEvent: ScheduleEvent = {
                    Index: eventSchedule.index,
                    ClassType: eventSchedule.classType,
                    IndexGroup: eventSchedule.indexGroup,
                    StartTime: eventSchedule.startTime,
                    EndTime: eventSchedule.endTime,
                    Remarks: [{ Venue: eventSchedule.venue, Remarks: eventSchedule.remarks.replace("Teaching ", "") }],
                    DayOfWeek: eventSchedule.dayOfWeek,
                    GridRow: CalculateGridRow(eventSchedule.startTime, eventSchedule.endTime),
                    BgColour: "pink"
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
        <div className="w-full h-full flex flex-row">
            <div className="w-[75%] h-full pr-8">
                <Schedule events={Array.from(selectedEvents.values()).reduce((acc, current) => { return acc.concat(current)}, [])} />
            </div>
            <div className="w-[25%] h-full">
                <div className="w-full">
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Input module to timetable"
                        onChange={handleSelectModule}
                        filterOption={filterOption}
                        options={moduleList}
                    />
                    <div className="pt-4">
                        <h1 className="pb-2">Modules Added: </h1>
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
    )
}