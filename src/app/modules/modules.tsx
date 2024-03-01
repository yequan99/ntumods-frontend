'use client'

import { ModuleMetaData } from "@/utils/types"

export default function Modules({modules}: {modules: ModuleMetaData[]}) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {modules.map((item,index) => (
                <div key={index} className="h-fit border-2 border-slate-200 rounded-md p-4 cursor-pointer hover:-translate-y-1.5 transition-all ease-in-out">
                    <div className="text-lg text-blue-800 flex flex-row justify-end">
                        <div className="flex flex-row w-4/5">
                            <div>
                                {item.moduleCode}
                            </div>
                            <div className="px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                                {item.title}
                            </div>
                        </div>
                        <div className="w-1/5 text-right italic">
                            {item.credits} AU
                        </div>
                    </div>
                    <div className="pt-4 h-40 overflow-hidden">
                        <div className="overflow-hidden line-clamp-5 text-justify">
                            {item.description}
                        </div>
                    </div>
                    <div className="text-xs rounded-full border-2 border-slate-400 px-2 w-fit">
                        BDE
                    </div>
                </div>
            ))}
        </div>
    )
}