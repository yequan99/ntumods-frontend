'use client'

import { useState, useEffect } from "react"

import { ScheduleEvent } from "@/utils/types"

export default function Event({scheduleEvents}: {scheduleEvents: ScheduleEvent[]}) {
    const [eventData, setEventData] = useState<ScheduleEvent[]>([])

    useEffect(() => {
        setEventData(scheduleEvents)
    }, [scheduleEvents])

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
                >
                    <div 
                        className={`absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 ${neutralColour[eventSchedule.BgColour]}`}
                    >
                        {/* <p className="order-1 text-gray-700">{eventSchedule.StartTime}-{eventSchedule.EndTime}</p> */}
                        <div className="order-2">
                            {eventSchedule.Remarks.map((remark,index) => (
                                <p key={index} className="text-gray-700">
                                    {remark.Venue} {remark.Remarks !== "" ? `(${remark.Remarks})` : ""}
                                </p>
                            ))}
                        </div>
                        {
                            eventSchedule.Code === undefined &&
                            <div className="flex flex-row">
                                <p className={`text-${eventSchedule.BgColour}-500 font-semibold pr-2`}>{eventSchedule.ClassType}</p>
                                <p className="text-gray-500">({eventSchedule.IndexGroup})</p>
                            </div>
                        }
                        {
                            eventSchedule.Code &&
                            <div className="flex flex-row flex-wrap">
                                <p className={`text-${eventSchedule.BgColour}-500 font-semibold pr-2`}>{eventSchedule.Code}</p>
                                <p className="text-gray-500">({eventSchedule.ClassType})</p>
                            </div>
                        }
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
    "green": "bg-green-100",
    "yellow": "bg-yellow-100"
}