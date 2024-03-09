import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

export default function Schedule() {

    const eventList = [
        {
            title: 'Lecture',
            daysOfWeek: ['3'],
            startTime: '12:30:00',
            endTime: '13:30:00',
            extendedProps: {
                description: "LT 24A",
            },
        },
    ]

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
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            dayHeaderFormat={{
                weekday: 'short'
            }}
            events={eventList}
        />
    )
}