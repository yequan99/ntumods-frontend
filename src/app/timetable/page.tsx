'use client'

import { useState } from "react"

import { ScheduleEvent, SelectedModuleData, SelectedExamData } from "@/utils/types"
import { deleteIcon } from "@/utils/icons"
import Schedule from "@/components/schedule"
import ModuleSearch from "./moduleSearch"
import { Select, Divider } from "antd"

export default function Timetable() {
    const [selectIndex, setSelectedIndex] = useState<ScheduleEvent[]>([])
    const [selectedModules, setSelectedModules] = useState<SelectedModuleData[]>([])
    const [examSchedule, setExamSchedules] = useState<SelectedExamData[]>([])

    const handleDelete = (module: string) => {
        const updatedModules: SelectedModuleData[] = selectedModules.filter(item => item.code !== module)
        setSelectedModules(updatedModules)
    }

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[75%] h-full pr-8">
                <Schedule events={selectIndex} />
            </div>
            <div className="w-[25%] h-full">
                <div className="w-full">
                    <div className="w-full">
                        <ModuleSearch setSelectedModules={setSelectedModules} />
                    </div>
                    <div className="pt-4">
                        <h1 className="pb-2">Modules Added: </h1>
                        {selectedModules.map((module,index) => (
                            <div key={index} className="flex flex-row items-center justify-between pb-2">
                                <h1>{module.code}</h1>
                                <Select 
                                    defaultValue={module.indexes[0]}
                                    options={module.indexes}
                                />
                                <div className="hover:cursor-pointer" onClick={() => {handleDelete(module.code)}}>
                                    {deleteIcon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Divider />
                <div className="w-full">
                    <h1>Exam Schedules:</h1>
                </div>
            </div>
        </div>
    )
}