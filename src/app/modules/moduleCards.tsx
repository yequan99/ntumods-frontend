import { ModuleMetaData } from "@/utils/types"

export default function ModuleCards({moduleData}: {moduleData: ModuleMetaData}) {
    return (
        <div className="h-fit border-2 border-slate-200 rounded-md p-4 cursor-pointer hover:-translate-y-1.5 transition-all ease-in-out">
            <div className="text-lg text-blue-800 flex flex-row justify-end">
                <div className="flex flex-row w-4/5">
                    <div>
                        {moduleData.moduleCode}
                    </div>
                    <div className="px-2 overflow-hidden text-ellipsis whitespace-nowrap">
                        {moduleData.title}
                    </div>
                </div>
                <div className="w-1/5 text-right italic">
                    {moduleData.credits} AU
                </div>
            </div>
            <div className="pt-4 h-40 overflow-hidden">
                <div className="overflow-hidden line-clamp-5 text-justify">
                    {moduleData.description}
                </div>
            </div>
            <div className="text-xs rounded-full border-2 border-slate-400 px-2 w-fit">
                BDE
            </div>
        </div>
    )
}