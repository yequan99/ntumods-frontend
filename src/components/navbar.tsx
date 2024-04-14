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

    const getWeek = (currentDate: Date, semStartDate: Date) => {
        let weeks = 0
        let pointer: Date = semStartDate

        while (pointer < currentDate) {
            if (pointer < currentDate) {
                weeks += 1
            }
            pointer.setDate(pointer.getDate() + 7)
        }

        let currentWeek = ""
        if (weeks <= 7) {
            currentWeek = `Week ${weeks}`
        } else if (weeks > 14){
            currentWeek = "Reading/Exam Week"
        } else if (weeks > 8) {
            currentWeek = `Week ${weeks-1}`
        } else {
            currentWeek = "Recess Week"
        }

        return currentWeek
    }

    const getSemesterInfo = (currentDate: Date) => {
        const currentYear: number = currentDate.getFullYear()
        const currentShortYear: number = currentYear % 100
        const currentMonth = currentDate.getMonth() + 1
    
        if (currentMonth >= 8) {
            // sem 1 (start in aug)
            const firstDayOfAug = new Date(currentYear, 7, 1)
            const dayOfWeekOfFirstAug = firstDayOfAug.getDay()
    
            let offset: number = dayOfWeekOfFirstAug - 1
    
            const semStartDate = new Date(currentYear, 7, 15 - offset)
            
            const curWeek = getWeek(currentDate, semStartDate)
    
            return `AY${currentShortYear-1}/${currentShortYear}, Semester 1, ${curWeek}`
        } else {
            // sem 2 (start in jan)
            const firstDayOfJan = new Date(currentYear, 0, 1)
            const dayOfWeekOfFirstJan = firstDayOfJan.getDay()
    
            let offset: number = dayOfWeekOfFirstJan - 1
    
            const semStartDate = new Date(currentYear, 0, 15 - offset)
            
            const curWeek = getWeek(currentDate, semStartDate)
    
            return `AY${currentShortYear-1}/${currentShortYear}, Semester 2, ${curWeek}`
        }
    }

    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center justify-between divide-y divide-slate-200 md:divide-y-0">
            <Link className="hover:cursor-pointer pl-4 md:pl-0 text-base md:text-xl lg:text-2xl" href="/">NTUMODS</Link>
            <div className="w-full flex flex-row justify-around md:justify-end items-center divide-x divide-slate-400 pr-4 md:pl-0">
                <ul className="flex">
                    {tabs.map((item,index) => (
                        <Link key={index} href={item.link}>
                            <li className={`flex flex-row items-center py-2 pr-4 md:pr-2 sm:ml-8 lg:ml-0 sm:mr-0 lg:mr-8 hover:cursor-pointer ${pathname.toLowerCase().includes(item.name.toLowerCase()) ? 'text-blue-800' : ''}`} >
                                <div className="w-6 h-6">
                                    {item.icon}
                                </div>
                                <h1 className="pl-2 text-sm">
                                    {item.name}
                                </h1>
                            </li>
                        </Link>
                    ))}
                </ul>
                <h1 className="text-sm pl-0 lg:pl-4 text-slate-800 hidden lg:block">
                    {getSemesterInfo(new Date())}
                </h1>
            </div>
        </div>
    )
}