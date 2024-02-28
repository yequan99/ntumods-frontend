import { ModuleMetaData } from "@/type/struct"

export default function ModuleCards({moduleData}: {moduleData: ModuleMetaData}) {
    return (
        <div className="h-fit border-2 border-slate-200 rounded-md p-4">
            <div className="text-lg text-blue-800 flex flex-row">
                <div>
                    {moduleData.moduleCode}
                </div>
                <div className="px-2">
                    {moduleData.title}
                </div>
            </div>
            <div className="pt-4">
                {moduleData.description}
            </div>
        </div>
    )
}