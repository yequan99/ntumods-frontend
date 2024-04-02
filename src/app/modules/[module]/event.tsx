'use client'

import { useState } from "react"

import { ScheduleEvent } from "@/utils/types"

export default function Event({scheduleEvents}: {scheduleEvents: ScheduleEvent[]}) {
    const [hoveredIndex, setHoveredIndex] = useState<string>("")

    const handleMouseEnter = (classIndex: string) => {
        console.log(classIndex)
        setHoveredIndex(classIndex)
    }

    const handleMouseLeave = () => {
        setHoveredIndex("")
    }

    const dayColumn: Record<string, string> = {
        "MON": "col-start-1",
        "TUE": "col-start-2",
        "WED": "col-start-3",
        "THU": "col-start-4",
        "FRI": "col-start-5"
    }

    const neutralColour: Record<string, string> = {
        "blue": "bg-blue-100",
        "pink": "bg-pink-100",
        "green": "bg-green-100"
    }

    const hoverColour: Record<string, string> = {
        "blue": "bg-blue-200",
        "pink": "bg-pink-200",
        "green": "bg-green-200"
    }

    const noHoverColour: Record<string, string> = {
        "blue": "bg-blue-50",
        "pink": "bg-pink-50",
        "green": "bg-green-50"
    }

    return (
        <ol
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-5 sm:pr-8"
            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
        >
            {scheduleEvents.map((eventSchedule,index) => (
                <li 
                    key={index} 
                    className={`relative mt-px flex sm:${dayColumn[eventSchedule.DayOfWeek]}`} 
                    style={{ gridRow: `${eventSchedule.GridRow[0]} / span ${eventSchedule.GridRow[1]}`}}
                    onMouseEnter={() => handleMouseEnter(eventSchedule.Index)}
                    onMouseLeave={handleMouseLeave}
                >
                    <div 
                        className={`absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 ${hoveredIndex === "COMMON" ? `${neutralColour[eventSchedule.BgColour]}` : hoveredIndex === "" ? `${neutralColour[eventSchedule.BgColour]}` : hoveredIndex === `${eventSchedule.Index}` || `${eventSchedule.Index}` === "COMMON" as string ? `${hoverColour[eventSchedule.BgColour]}` : `${noHoverColour[eventSchedule.BgColour]}`}`}
                    >
                        <p className="order-1 text-gray-700">{eventSchedule.StartTime}-{eventSchedule.EndTime}</p>
                        <p className="order-2 text-gray-700">{eventSchedule.Venue}</p>
                        <div className="flex flex-row">
                            <p className="text-black font-semibold pr-2">{eventSchedule.Index}</p>
                            <p className={`text-${eventSchedule.BgColour}-500 font-semibold pr-2`}>{eventSchedule.ClassType}</p>
                            <p className="text-gray-500">({eventSchedule.IndexGroup})</p>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    )
}