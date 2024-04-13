'use client'

export default function Error() {
    return (
        <div className="w-full h-full flex flex-row justify-center items-center">
            <div className="flex flex-row justify-center items-center divide-x divide-slate-400">
                <h1 className="text-slate-700 text-2xl pr-2">404</h1>
                <h1 className="text-slate-700 text-2xl pl-2">Module not found!</h1>
            </div>
        </div>

    )
}