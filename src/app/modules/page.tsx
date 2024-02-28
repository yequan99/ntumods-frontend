'use client'

import { useState, useEffect } from "react"
import { ModuleMetaData } from "@/type/struct"

import ModuleCards from "./moduleCards"

export default function CoursesPage() {
    const [moduleData, setModuleData] = useState<ModuleMetaData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/mockData.json')
                const data: ModuleMetaData[] = await response.json()
                setModuleData(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-9 gap-4 h-10 mb-8">
                <div className="col-span-4 border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Search for module name or code</h1>
                </div>
                <div className="col-span-3 border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Faculty</h1>
                </div>
                <div className="border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Semester</h1>
                </div>
                <div className="border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Module type</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-20">
                {moduleData.map((item,index) => (
                    <ModuleCards key={index} moduleData={item} />
                ))}
            </div>
        </div>
    )
}