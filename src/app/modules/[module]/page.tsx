'use client'

import { useState, useEffect } from "react"
import { Anchor } from "antd"

import { ModuleFullData } from "@/utils/types"

export default function Module({ params }: { params: { module: string } }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [moduleDetails, setModuleDetails] = useState<ModuleFullData | null>(null)

    useEffect(() => {
        // make API call to fetch module detail using modulecode
        const data: ModuleFullData = {
            moduleCode: params.module,
            title: "Cloud Computing",
            description: "Cloud computing refers to both the applications delivered as services over the Internet and the modern applications powered by these services, collectively known as Software as a Service (SaaS), IaaS (Infrastructure as a Service) and PaaS (Platform as a Service). This course introduces the students to the basic concepts and theory behind cloud computing. Techniques and algorithms in distributed computing that leverages artificial intelligence, machine learning and blockchains, topics that forms an integral part of modern cloud computing and edge/fog computing, will also be covered, along with industrial perspectives. Upon completion, students will be able to understand cloud computing applications that use software frameworks, e.g., MapReduce/Spark, distributed computing services-including database, networking, software, analytics, and intelligence over the Internet to offer faster innovation, flexible resources, and economies of scale.",
            credits: 3,
            course: "Computer Science",
            faculty: "School of Computer Science and Engineering",
            semester: "2",
            moduleType: "BDE",
            prerequisites: ["CZ1003", "CZ2003"],
            exam: "8 May 2024, 9.00 am - 11.00 am",
            index: {
                lecture: [{
                    day: "Wednesday",
                    start: "1430",
                    end: "1630",
                    venue: "LT27A"
                }],
                tutorial: [{
                    day: "Monday",
                    start: "1030",
                    end: "1130",
                    venue: "TR12"
                }],
                lab: [{
                    day: "Thursday",
                    start: "1230",
                    end: "1430",
                    venue: "Software Lab 3"
                }],
                seminar: []
            }
        }
        setModuleDetails(data)
    }, [])

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-[75%]">
                <div id="details" className="h-fit pb-16">
                    <h1 className="font-bold text-4xl text-blue-800">
                        {moduleDetails?.moduleCode}
                    </h1>
                    <h1 className="text-slate-500 font-bold text-3xl pt-2">
                        {moduleDetails?.title}
                    </h1>
                    <div className="flex flex-row mt-4 divide-x divide-slate-400 text-slate-800">
                        <h1 className="pr-2">{moduleDetails?.course}</h1>
                        <h1 className="px-2">{moduleDetails?.faculty}</h1>
                        <h1 className="pl-2">{moduleDetails?.credits} AU</h1>
                    </div>
                    <p className="pt-4">{moduleDetails?.description}</p>
                </div>
                <div id="indexes" className="h-screen">
                    {moduleDetails?.index.lecture.map((item,index) => (
                        <div key={index}>
                            <h1>Lecture {index+1}</h1>
                            <h1>Day: {item.day}</h1>
                            <h1>Time: {item.start}-{item.end}</h1>
                            <h1>Venue: {item.venue}</h1>
                        </div>
                    ))}
                </div>
                <div id="reviews" className="h-screen">
                    This is review section
                </div>
            </div>
            <div className="fixed right-0 w-[25%]">
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