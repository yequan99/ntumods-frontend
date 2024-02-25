import Link from 'next/link';
import { timetable, course } from "@/icons/icons"

export default function SideBar() {

    const tabs = [
        {name: "Timetable", icon: timetable, link:"/timetable"},
        {name: "Courses", icon: course, link:"/courses"}
    ]

    return (
        <div className="h-full flex justify-center border-r border-slate-200">
            <ul className="py-4">
                {tabs.map((item,index) => (
                    <Link key={index} href={item.link}>
                        <li className="py-4 hover:cursor-pointer">
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
