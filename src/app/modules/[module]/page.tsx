'use client'

import { useState, useEffect } from "react"
import { Anchor } from "antd"

import { ModuleData, ScheduleEvent, ParsedScheduleEvent, ThreadReviewData } from "@/utils/types"
import Schedule from "@/components/schedule"
import Reviews from "./reviews"

const bgColor: Record<string, string> = {
    "LEC": "pink",
    "TUT": "blue",
    "LAB": "green"
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
                const response = await fetch('/data/mockModuleData.json')
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
        moduleIndexes.Schedules.map((schedule) => {
            const newEvent: ScheduleEvent = {
                Index: schedule.Index,
                ClassType: schedule.ClassType,
                IndexGroup: schedule.IndexGroup,
                StartTime: schedule.StartTime,
                EndTime: schedule.EndTime,
                Venue: schedule.Venue,
                DayOfWeek: schedule.DayOfWeek,
                Remarks: schedule.Remarks,
                GridRow: calculateGridRow(schedule.StartTime, schedule.EndTime),
                BgColour: bgColor[schedule.ClassType]
            }
            if (tempIndexMap[newEvent.Index]) {
                tempIndexMap[newEvent.Index].push(newEvent)
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

    // 0.5 hrs -> span 11
    // 1 hr -> span 22 
    // offset = gridrow 2
    // 0.5 hrs -> gridrow 11
    // 1 hr -> gridrow 11

    const calculateGridRow = (startTimeString: string, endTimeString: string) => {
        var startTime = parseInt(startTimeString, 10)
        var endTime = parseInt(endTimeString, 10)
        const timetableStart: number = 800
        var startGrid = (getNumOfIntervals(timetableStart, startTime) * 11) + 2
        var span = getNumOfIntervals(startTime, endTime) * 11

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

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[80%]">
                <div id="details" className="h-fit pb-16">
                    <h1 className="font-bold text-4xl text-blue-800">
                        {moduleDetails?.Code}
                    </h1>
                    <h1 className="text-slate-500 font-bold text-3xl pt-2">
                        {moduleDetails?.Title}
                    </h1>
                    <div className="flex flex-row mt-4 divide-x divide-slate-400 text-slate-800">
                        <h1 className="pr-2">{moduleDetails?.Course}</h1>
                        <h1 className="px-2">{moduleDetails?.Faculty}</h1>
                        <h1 className="pl-2">{moduleDetails?.AU} AU</h1>
                    </div>
                    <p className="pt-4">{moduleDetails?.Description}</p>
                </div>
                <div id="indexes" className="pb-16">
                    <h1 className="font-bold text-slate-500 text-2xl">Available Indexes: </h1>
                    <div className="pt-2 flex flex-row">
                        {indexList.map((indexNum, index) => (
                            <h1 
                                key={index} 
                                className={`p-2 rounded-md mr-2 hover:cursor-pointer ${selectedIndex === indexNum ? "bg-blue-800 text-white border-2 border-blue-800" : "border-2"}`}
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