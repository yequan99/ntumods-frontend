'use client'

import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

import { ScheduleEvent } from "@/utils/types"

export default function Schedule({index}:{index: ScheduleEvent[]}) {

    return (
        <FullCalendar
            plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
            headerToolbar={{
                left: '',
                center: '',
                right: ''
            }}
            initialView="timeGridWeek"
            weekends={false}
            allDaySlot={false}
            now="2012-01-01T00:00:00" // need to hardcode a date if not it will highlight the current day
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            dayHeaderFormat={{
                weekday: 'short'
            }}
            events={index}
            slotLaneDidMount={(info) => {info.el.style.height = '40px'}}
            eventContent={(eventInfo) => {
                return (
                    <div>
                        <div>{eventInfo.event.title}</div>
                        <div>{eventInfo.event.extendedProps.description}</div>
                    </div>
                )
            }}
        />
    )
}