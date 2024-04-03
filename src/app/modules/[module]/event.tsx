'use client'

import { useState, useEffect } from "react"
import { Dropdown, Menu } from 'antd';

import { ParsedScheduleEvent } from "@/utils/types"

export default function Event({scheduleEvents}: {scheduleEvents: ParsedScheduleEvent[]}) {
    const [eventData, setEventData] = useState<ParsedScheduleEvent[]>([])
    const [hoveredIndex, setHoveredIndex] = useState<string>("")

    useEffect(() => {
        setEventData(scheduleEvents)
    }, [scheduleEvents])

    const handleMouseEnter = (classIndex: string) => {
        console.log(classIndex)
        setHoveredIndex(classIndex)
    }

    const handleMouseLeave = () => {
        setHoveredIndex("")
    }

    const handleSelectIndex = (selectedIndex: string) => {
        var newEventData: ParsedScheduleEvent[] = eventData
        var selectedIndexes: ParsedScheduleEvent[] = []
        for (let i = 0; i < newEventData.length; i++) {
            if (newEventData[i].Index === selectedIndex) {
                const selectedEvent: ParsedScheduleEvent = newEventData.splice(i,1)[0]
                selectedIndexes.push(selectedEvent)
                i--
            } 
        }
        newEventData.push(...selectedIndexes)
        setEventData(newEventData)
    }

    const generateMenu = (scheduleData: ParsedScheduleEvent) => {
        return (
            <Menu>
                {scheduleData.OtherIndexes.map((index, i) => (
                    index !== scheduleData.Index && 
                    <Menu.Item key={i} onClick={() => handleSelectIndex(index)}>
                        {index}
                    </Menu.Item>
                ))}
            </Menu>
        )
    }

    return (
        <ol
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-5 sm:pr-8"
            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
        >
            {eventData.map((eventSchedule,index) => (
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
                            <p className="text-black font-semibold pr-2">
                                {eventSchedule.Index}
                            </p>
                            <p className={`text-${eventSchedule.BgColour}-500 font-semibold pr-2`}>{eventSchedule.ClassType}</p>
                            <p className="text-gray-500">({eventSchedule.IndexGroup})</p>
                        </div>
                        <div className={`absolute right-2 bottom-1 ${eventSchedule.OtherIndexes.length > 1 ? "visible cursor-pointer" : "invisible"} h-fit w-fit px-2 border-2 border-slate-400 rounded-2xl text-slate-500`}>
                            <Dropdown overlay={generateMenu(eventSchedule)} placement="bottom" arrow>
                                <p>{eventSchedule.OtherIndexes.length - 1} other index</p>
                            </Dropdown>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    )
}

const dayColumn: Record<string, string> = {
    "MON": "col-start-1 col-end-2",
    "TUE": "col-start-2 col-end-3",
    "WED": "col-start-3 col-end-4",
    "THU": "col-start-4 col-end-5",
    "FRI": "col-start-5 col-end-6"
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