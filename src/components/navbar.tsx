'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { timetable, course } from "@/utils/icons"

export default function NavBar() {
    const pathname = usePathname().substring(1)

    const tabs = [
        { name: "Timetable", icon: timetable, link:"/timetable" },
        { name: "Modules", icon: course, link:"/modules" }
    ]

    const getSemesterInfo = (currentDate: Date) => {
        // const currentDate: Date = new Date()
        const currentYear = currentDate.getFullYear() % 100
        const currentMonth = currentDate.getMonth() + 1

        if (currentMonth < 8) {
            // sem 2
            const january = 0
            const firstDayOfJan = new Date(currentYear, january, 1)
            const dayOfWeekOfFirstJan = firstDayOfJan.getDay()

            let offset = 0
            if (dayOfWeekOfFirstJan < 1) {
                offset = 1 - dayOfWeekOfFirstJan // If the first day of January is Monday or Sunday, the second Monday is on the 8th
            } else {
                offset = 8 - dayOfWeekOfFirstJan // If the first day of January is any other day, the second Monday is on the 15th
            }
            const semStartDate = new Date(new Date().getFullYear(), january, offset + 7)
            let weeks = 1
            let pointer: Date = semStartDate

            while (semStartDate < currentDate) {
                weeks += 1
                pointer.setDate(pointer.getDate() + 7)
            }
            weeks -= 1
            let currentWeek = ""
            if (weeks <= 7) {
                currentWeek = `Week ${weeks}`
            } else if (weeks > 13){
                currentWeek = "Reading/Exam Week"
            } else if (weeks > 8) {
                currentWeek = `Week ${weeks-1}`
            } else {
                currentWeek = "Recess Week"
            }

            return `AY${currentYear-1}/${currentYear}, Semester 2, ${currentWeek}`
        } else {
            // sem 1
            const august = 7
            const firstDayOfAug = new Date(currentDate.getFullYear(), august, 1)
            const dayOfWeekOfFirstAug = firstDayOfAug.getDay()

            let offset = 0
            if (dayOfWeekOfFirstAug < 1) {
                offset = 1 - dayOfWeekOfFirstAug // If the first day of January is Monday or Sunday, the second Monday is on the 8th
            } else {
                offset = 8 - dayOfWeekOfFirstAug // If the first day of January is any other day, the second Monday is on the 15th
            }
            const semStartDate = new Date(currentDate.getFullYear(), august, offset + 7)
            let weeks = 1
            let pointer: Date = semStartDate

            while (pointer < currentDate) {
                weeks += 1
                pointer.setDate(pointer.getDate() + 7)
            }
            weeks -= 1
            let currentWeek = ""
            if (weeks <= 7) {
                currentWeek = `Week ${weeks}`
            } else if (weeks > 13){
                currentWeek = "Reading/Exam Week"
            } else if (weeks > 8) {
                currentWeek = `Week ${weeks-1}`
            } else {
                currentWeek = "Recess Week"
            }
            return `AY${currentYear}/${currentYear+1}, Semester 1, ${currentWeek}`
        }
    }

    return (
        <div className="h-full w-full flex flex-row items-center justify-between">
            <Link className="hover:cursor-pointer text-2xl" href="/">NTUMODS</Link>
            <div className="flex flex-row items-center divide-x divide-slate-400">
                <ul className="flex">
                    {tabs.map((item,index) => (
                        <Link key={index} href={item.link}>
                            <li className={`flex flex-row items-center py-2 pr-2 mr-8 hover:cursor-pointer ${pathname.toLowerCase().includes(item.name.toLowerCase()) ? 'text-blue-800' : ''}`} >
                                <div className="w-6 h-6">
                                    {item.icon}
                                </div>
                                <h1 className="pl-2">
                                    {item.name}
                                </h1>
                            </li>
                        </Link>
                    ))}
                </ul>
                <h1 className="text-sm pl-4 text-slate-800">
                    {getSemesterInfo(new Date())}
                </h1>
            </div>
        </div>
    )
}