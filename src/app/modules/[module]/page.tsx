'use client'

import { useState, useEffect } from "react"
import { Anchor } from "antd"

import { ModuleData, ScheduleEvent, ThreadReviewData, ModuleInfo } from "@/utils/types"
import Schedule from "@/components/schedule"
import Reviews from "./reviews"

const bgColor: Record<string, string> = {
    "LEC/STUDIO": "pink",
    "TUT": "blue",
    "LAB": "green",
    "SEM": "yellow"
}

export default function Module({ params }: { params: { module: string } }) {
    const [moduleDetails, setModuleDetails] = useState<ModuleData | null>(null)
    const [selectedIndexSchedule, setSelectedIndexSchedule] = useState<ScheduleEvent[]>([])
    const [indexMap, setIndexMap] = useState<Record<string, ScheduleEvent[]>>({})
    const [reviews, setReviews] = useState<ThreadReviewData[]>([])
    const [indexList, setIndexList] = useState<string[]>([])
    const [selectedIndex, setSelectedIndex] = useState<string>("")

    useEffect(() => {
        // make API call to fetch module detail using modulecode
        const fetchModuleData = async () => {
            try {
                // const response = await fetch('/data/mockfakeData.json')
                const response = await fetch(`/data/fullData/moduleData/${params.module}.json`)
                const data: ModuleData = await response.json()

                setModuleDetails(data)
                const parsedEvent: ScheduleEvent[] = ParseEventSchedule(data)
                setSelectedIndexSchedule(parsedEvent)
            } catch (error) {
                console.log('Error fetching module data:', error)
            }
        }

        // make API call to fetch reviews data using modulecode
        const fetchReviewData = async () => {
            try {
                const response = await fetch('/data/mockReviewData.json')
                const data: ThreadReviewData[] = await response.json()

                setReviews(data)
            } catch (error) {
                console.log('Error fetching review data')
            }
        }
        fetchModuleData()
        fetchReviewData()
    }, [])

    const ParseEventSchedule = (moduleIndexes: ModuleData) => {
        var listOfIndex: string[] = []
        var tempIndexMap: Record<string, ScheduleEvent[]> = {}
        moduleIndexes.schedule.map((event) => {
            const newEvent: ScheduleEvent = {
                Index: event.index,
                ClassType: event.classType,
                IndexGroup: event.indexGroup,
                StartTime: event.startTime,
                EndTime: event.endTime,
                Remarks: [{ Venue: event.venue, Remarks: event.remarks.replace("Teaching ", "") }],
                DayOfWeek: event.dayOfWeek,
                GridRow: calculateGridRow(event.startTime, event.endTime),
                BgColour: bgColor[event.classType]
            }
            if (tempIndexMap[newEvent.Index]) {
                let found: boolean = false
                for (let i = 0; i < tempIndexMap[newEvent.Index].length; i++) {
                    if (tempIndexMap[newEvent.Index][i].ClassType === newEvent.ClassType && tempIndexMap[newEvent.Index][i].DayOfWeek === newEvent.DayOfWeek && tempIndexMap[newEvent.Index][i].StartTime === newEvent.StartTime && tempIndexMap[newEvent.Index][i].EndTime === newEvent.EndTime) {
                        tempIndexMap[newEvent.Index][i].Remarks.push(...newEvent.Remarks)
                        found = true
                    }
                }
                if (!found) {
                    tempIndexMap[newEvent.Index].push(newEvent)
                }
            } else {
                tempIndexMap[newEvent.Index] = [newEvent]
                listOfIndex.push(newEvent.Index)
            }
        })
        const sortedListOfIndex: string[] = listOfIndex.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
        setIndexList(sortedListOfIndex)
        setSelectedIndex(sortedListOfIndex[0])
        setIndexMap(tempIndexMap)
        return tempIndexMap[sortedListOfIndex[0]]
    }

    // 0.5 hrs -> span 10
    // 1 hr -> span 20 
    // offset = gridrow 2
    // 0.5 hrs -> gridrow 10
    // 1 hr -> gridrow 20

    const calculateGridRow = (startTimeString: string, endTimeString: string) => {
        var startTime = parseInt(startTimeString, 10)
        var endTime = parseInt(endTimeString, 10)
        const timetableStart: number = 800
        const startGridInterval: number = getNumOfIntervals(timetableStart, startTime)
        var startGrid = (startGridInterval * 10) + 2 + Math.floor(startGridInterval / 3)
        var span = getNumOfIntervals(startTime, endTime) * 10

        return [startGrid.toString(), span.toString()]
    }

    const getNumOfIntervals = (startTime: number, endTime:number) => {
        var start = Math.floor(startTime / 100) * 60 + (startTime % 100)
        var end = Math.floor(endTime / 100) * 60 + (endTime % 100)

        var diffInMinutes = Math.abs(end - start)
        var numOfIntervals = Math.ceil(diffInMinutes / 30)

        return numOfIntervals
    }

    const handleSelectIndex = (newIndex: string) => {
        setSelectedIndex(newIndex)
        setSelectedIndexSchedule(indexMap[newIndex])
    }

    const moduleInfo: ModuleInfo[] = [
        {title: "Exam", data: moduleDetails?.exam.date === "" ? "" : `${moduleDetails?.exam.date} (${moduleDetails?.exam.dayOfWeek}), ${moduleDetails?.exam.time} (${moduleDetails?.exam.duration})`},
        {title: "Pre-requisite(s)", data: moduleDetails?.prerequisite},
        {title: "Mutually Exclusive", data: moduleDetails?.mutually_exclusive},
        {title: "Not Available To", data: moduleDetails?.not_available_to},
        {title: "Not Available To All Programme With", data: moduleDetails?.not_available_to_prog_with},
        {title: "Grade Type", data: moduleDetails?.grade_type},
        {title: "Not Available As UE", data: moduleDetails?.not_available_as_ue},
        {title: "Not Available As PE", data: moduleDetails?.not_available_as_pe},
        {title: "Not Offered As BDE", data: moduleDetails?.notOfferedAsBDE ? "Yes" : ""}
    ]

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[80%]">
                <div id="details" className="h-fit pb-16">
                    <h1 className="font-bold text-4xl text-blue-800">
                        {moduleDetails?.code}
                    </h1>
                    <h1 className="text-slate-500 font-bold text-3xl pt-2">
                        {moduleDetails?.title}
                    </h1>
                    <div className="flex flex-row mt-4 divide-x divide-slate-400 text-slate-800">
                        <h1 className="pr-2">{moduleDetails?.faculty.Faculty} ({moduleDetails?.faculty.Code})</h1>
                        <h1 className="pl-2">{moduleDetails?.au} AU</h1>
                    </div>
                    <p className="pt-4">{moduleDetails?.description}</p>
                    <table className="table-fixed w-full mt-8 border-collapse border border-gray-200">
                        <tbody>
                            {moduleInfo.map((detail,index) => (
                                <tr key={index}>
                                    <td className="border border-gray-400 px-4 py-2">{detail.title}</td>
                                    <td className="border border-gray-400 px-4 py-2">{detail.data === "" ? "N/A" : detail.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="indexes" className="pb-16">
                    <h1 className="font-bold text-slate-500 text-2xl">Available Indexes: </h1>
                    <div className="pt-2 pb-4 flex flex-row flex-wrap">
                        {indexList.map((indexNum, index) => (
                            <h1 
                                key={index} 
                                className={`p-2 rounded-md mr-2 mt-2 w-30 hover:cursor-pointer ${selectedIndex === indexNum ? "bg-blue-800 text-white border-2 border-blue-800" : "border-2"}`}
                                onClick={() => {handleSelectIndex(indexNum)}}
                            >
                                {indexNum}
                            </h1>
                        ))}
                    </div>
                    <div className="h-[48rem]">
                        <Schedule events={selectedIndexSchedule} />
                    </div>
                </div>
                <div id="reviews" className="h-screen">
                    <Reviews reviews={reviews} />
                </div>
            </div>
            <div className="fixed right-0 w-[20%]">
                <Anchor
                    targetOffset={112}
                    items={[
                    {
                        key: 'details',
                        href: '#details',
                        title: 'Details',
                    },
                    {
                        key: 'indexes',
                        href: '#indexes',
                        title: 'Indexes',
                    },
                    {
                        key: 'reviews',
                        href: '#reviews',
                        title: 'Reviews',
                    },
                    ]}
                />
            </div>
        </div>
    )
}