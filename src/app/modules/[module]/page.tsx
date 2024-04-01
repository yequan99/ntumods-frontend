'use client'

import { useState, useEffect } from "react"
import { Anchor } from "antd"

import { ModuleData,ScheduleEvent } from "@/utils/types"
import Schedule from "./schedule"

const daysMap: Record<string, string> = {
    "Monday": "1",
    "Tuesday": "2",
    "Wednesday": "3",
    "Thursday": "4",
    "Friday": "5"
}

const indexColor: Record<string, string> = {
    "LEC": "green",
    "TUT": "blue",
    "LAB": "yellow"
}

const textColor: Record<string, string> = {
    "LEC": "white",
    "TUT": "white",
    "LAB": "black"
}

export default function Module({ params }: { params: { module: string } }) {
    const [moduleDetails, setModuleDetails] = useState<ModuleData | null>(null)
    const [indexSchedule, setIndexSchedule] = useState<ScheduleEvent[]>([])

    useEffect(() => {
        // make API call to fetch module detail using modulecode
        const fetchData = async () => {
            try {
                const response = await fetch('/data/mockModuleData.json')
                const data: ModuleData = await response.json()

                setModuleDetails(data)
                const parsedIndex: ScheduleEvent[] = ParseEventSchedule(data)
                setIndexSchedule(parsedIndex)
            } catch (error) {
                console.log('Error fetching module data:', error)
            }
        }
        fetchData()
    }, [])

    const ParseEventSchedule = (eventData: ModuleData) => {
        var newEventSchedule: ScheduleEvent[] = []
        eventData.Schedules.map((schedule) => {
            const newEvent: ScheduleEvent = {
                title: schedule.ClassType,
                daysOfWeek: [daysMap[schedule.DayOfWeek]],
                startTime: convertTimeFormat(schedule.StartTime),
                endTime: convertTimeFormat(schedule.EndTime),
                extendedProps: {
                    description: schedule.Venue
                },
                color: indexColor[schedule.ClassType],
                textColor: textColor[schedule.ClassType],
                groupId: schedule.GroupID
            }
            newEventSchedule.push(newEvent)
        })
        return newEventSchedule
    }

    const convertTimeFormat = (inputTime: string) => {
        const hours: string = inputTime.slice(0,2)
        const minutes: string = inputTime.slice(2)

        return `${hours}:${minutes}:00`
    }

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
                    <h1>Available Indexes: </h1>
                    <Schedule index={indexSchedule} />
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