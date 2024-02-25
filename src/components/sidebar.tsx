import { timetable, course } from "@/icons/icons"

export default function SideBar() {
    return (
        <div className="h-full flex justify-center border-r border-slate-200">
            <ul className="py-4">
                <li className="py-4">
                    <div className="flex flex-row items-center">
                        <div className="w-8 h-8">
                            {timetable}
                        </div>
                        <h1 className="pl-2">Timetable</h1>
                    </div>
                </li>
                <li className="py-4">
                    <div className="flex flex-row items-center">
                        <div className="w-8 h-8">
                            {course}
                        </div>
                        <h1 className="pl-2">Courses</h1>
                    </div>
                </li>
            </ul>
        </div>
    )
}
