'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { timetable, course, search } from "@/icons/icons"

export default function NavBar() {
    const pathname = usePathname().substring(1)

    const tabs = [
        { name: "Timetable", icon: timetable, link:"/timetable" },
        { name: "Modules", icon: course, link:"/modules" }
    ]

    return (
        <div className="h-full w-full flex flex-row items-center justify-between">
            <Link className="hover:cursor-pointer text-2xl" href="/">NTUMODS</Link>
            <div className="flex flex-row items-center divide-x divide-slate-400">
                <ul className="flex">
                    {tabs.map((item,index) => (
                        <Link key={index} href={item.link}>
                            <li className={`flex flex-row items-center py-2 px-4 mr-8 hover:cursor-pointer ${item.name.toLowerCase() === pathname ? 'text-blue-800' : ''}`} >
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
                    AY2023/24, Semester 2, Recess Week
                </h1>
            </div>
        </div>
    )
}