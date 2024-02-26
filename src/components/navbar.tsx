'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { timetable, course, search } from "@/icons/icons"

export default function NavBar() {
    const pathname = usePathname().substring(1)

    const tabs = [
        { name: "Timetable", icon: timetable, link:"/timetable" },
        { name: "Courses", icon: course, link:"/courses" }
    ]

    return (
        <div className="h-full w-full flex items-center">
            <Link className="hover:cursor-pointer text-xl" href="/">NTUMODS</Link>
            <div className="w-full flex flex-row justify-between">
                <ul className="flex pl-24">
                    {tabs.map((item,index) => (
                        <Link key={index} href={item.link}>
                            <li className={`flex flex-row items-center p-2 mr-8 hover:cursor-pointer ${item.name.toLowerCase() === pathname ? 'border-b-2 border-slate-400' : ''}`} >
                                <div className="w-8 h-8">
                                    {item.icon}
                                </div>
                                <h1 className="pl-2">
                                    {item.name}
                                </h1>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="flex flex-row items-center divide-x divide-slate-300">
                    <div className="relative">
                        <div className="flex items-center mr-2">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {search}
                            </div>
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 border rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <h1 className="text-sm pl-2 text-slate-500">
                        AY2023/24, Semester 2, Recess Week
                    </h1>
                </div>
            </div>
        </div>
    )
}