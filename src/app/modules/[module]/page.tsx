'use client'

import { useState, useEffect } from "react"
import { Anchor } from "antd"

import { ModuleData } from "@/utils/types"
import Schedule from "./schedule"

export default function Module({ params }: { params: { module: string } }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [moduleDetails, setModuleDetails] = useState<ModuleData | null>(null)

    useEffect(() => {
        // make API call to fetch module detail using modulecode
        const fetchData = async () => {
            try {
                const response = await fetch('/data/mockModuleData.json')
                const data: ModuleData = await response.json()

                setModuleDetails(data)
                console.log("rendered module data")
            } catch (error) {
                console.log('Error fetching module data:', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[75%]">
                <div id="details" className="h-fit pb-16">
                    <h1 className="font-bold text-4xl text-blue-800">
                        {moduleDetails?.Code}
                    </h1>
                    <h1 className="text-slate-500 font-bold text-3xl pt-2">
                        {moduleDetails?.Title}
                    </h1>
                    <div className="flex flex-row mt-4 divide-x divide-slate-400 text-slate-800">
                        <h1 className="pr-2">{moduleDetails?.Course}</h1>
                        <h1 className="px-2">{moduleDetails?.Faculty}</h1>
                        <h1 className="pl-2">{moduleDetails?.AU} AU</h1>
                    </div>
                    <p className="pt-4">{moduleDetails?.Description}</p>
                </div>
                <div id="indexes" className="h-fit pb-16">
                    {/* {moduleDetails?.Schedules.map((item,index) => (
                        <div key={index}>
                            <h1>{item.ClassType}</h1>
                            <h1>Day: {item.DayOfWeek}</h1>
                            <h1>Time: {item.StartTime}-{item.EndTime}</h1>
                            <h1>Venue: {item.Venue}</h1>
                        </div>
                    ))} */}
                    <h1>Available Indexes: </h1>
                    <Schedule />
                </div>
                <div id="reviews" className="h-screen">
                    This is review section
                </div>
            </div>
            <div className="fixed right-0 w-[25%]">
                <Anchor
                    targetOffset={112}
                    items={[
                    {
                        key: 'details',
                        href: '#details',
                        title: 'Details',
                    },
                    {
                        key: 'indexes',
                        href: '#indexes',
                        title: 'Indexes',
                    },
                    {
                        key: 'reviews',
                        href: '#reviews',
                        title: 'Reviews',
                    },
                    ]}
                />
            </div>
        </div>
    )
}