'use client'

import { useState, useEffect } from "react"
import { Pagination, Divider } from 'antd';

import { ModuleMetaData, FilterData } from "@/utils/types"
import Modules from "./modules"
import ModuleFilter from "./moduleFilters"

export default function CoursesPage() {
    const [moduleData, setModuleData] = useState<ModuleMetaData[]>([])
    // const [filter, setFilter] = useState<FilterData>({moduleCode: "", title: "", faculty: "", semester: 0, moduleType: ""})
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/mockData.json')
                const data: ModuleMetaData[] = await response.json()
                setModuleData(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    // Getting current posts based on pagination
    const postsPerPage: number = 10
    const indexOfFirstPost: number = currentPage * postsPerPage
    const indexOfLastPost: number = indexOfFirstPost + postsPerPage
    const currentPosts: ModuleMetaData[] = moduleData.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full">
                <ModuleFilter />
            </div>
            <Divider className="w-full" orientation="right" plain orientationMargin="0">
                {moduleData.length} courses found
            </Divider>
            <div className="w-full">
                <Modules modules={currentPosts} />
            </div>
            <div className="py-8">
                <Pagination onChange={(value) => setCurrentPage(value-1)} defaultCurrent={1} total={moduleData.length} />
            </div>
        </div>
    )
}