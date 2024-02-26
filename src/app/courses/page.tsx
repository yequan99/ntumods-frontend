export default function CoursesPage() {

    const moduleInfo = [1,2,3,4,5,6,7,8,9,10]

    return (
        <div className="w-full h-full">
            <div className="grid grid-cols-9 gap-4 h-10 mb-8">
                <div className="col-span-4 border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Search for module name or code</h1>
                </div>
                <div className="col-span-3 border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Faculty</h1>
                </div>
                <div className="border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Semester</h1>
                </div>
                <div className="border-2 border-slate-200 rounded-lg flex items-center">
                    <h1 className="text-slate-400 pl-2">Module type</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 h-20">
                {moduleInfo.map((item,index) => (
                    <div key={index} className="h-20 border-2 border-slate-200 rounded-lg flex items-center">
                        Module Info
                    </div>
                ))}
            </div>
        </div>
    )
}