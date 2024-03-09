import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

export default function Schedule() {

    const eventList = [
        {
            title: 'LEC',
            daysOfWeek: ['3'],
            startTime: '14:30:00',
            endTime: '16:30:00',
            extendedProps: {
                description: "LT 27A",
            },
            color: 'green'
        },
        {
            title: 'TUT',
            daysOfWeek: ['1'],
            startTime: '10:00:00',
            endTime: '11:00:00',
            extendedProps: {
                description: "TR 29",
            },
            color: 'blue',
        },
        {
            title: 'LAB',
            daysOfWeek: ['4'],
            startTime: '12:30:00',
            endTime: '14:30:00',
            extendedProps: {
                description: "Software Lab 3",
            },
            color: 'yellow',
            textColor: 'black',
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