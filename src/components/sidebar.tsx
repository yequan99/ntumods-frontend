'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { timetable, course } from "@/icons/icons"

export default function SideBar() {
    const pathname = usePathname().substring(1)

    const tabs = [
        { name: "Timetable", icon: timetable, link:"/timetable" },
        { name: "Courses", icon: course, link:"/courses" }
    ]

    return (
        <div className="h-full flex border-r border-slate-200">
            <ul className="py-4 px-10 w-full">
                {tabs.map((item,index) => (
                    <Link key={index} href={item.link}>
                        <li className={`w-full my-2 py-2 px-4 hover:cursor-pointer ${item.name.toLowerCase() === pathname ? 'bg-blue-100 rounded-lg': ''}`}>
                            <div className="flex flex-row items-center">
                                <div className="w-8 h-8">
                                    {item.icon}
                                </div>
                                <h1 className="pl-2">{item.name}</h1>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
