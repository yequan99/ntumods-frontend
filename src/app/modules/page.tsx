'use client'

import { useState, useEffect } from "react"
import { Pagination, Divider, Skeleton } from 'antd';

import { ModuleMetaData, FilterData, SelectData } from "@/utils/types"
import Modules from "./modules"
import ModuleFilter from "./moduleFilters"

export default function CoursesPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [moduleData, setModuleData] = useState<ModuleMetaData[]>([])
    const [filteredData, setFilteredData] = useState<ModuleMetaData[]>([])
    const [filter, setFilter] = useState<FilterData>({query: "", faculty: "All Faculties"})
    const [facultyList, setFacultyList] = useState<SelectData[]>([{ value: 'All Faculties', label: 'All Faculties' }])
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get module list
                const moduleResponse = await fetch('/data/fullData/moduleList.json') // cache json and revalidate every hour
                const moduleData: ModuleMetaData[] = await moduleResponse.json()
                moduleData.sort((a,b) => a.code.localeCompare(b.code))

                setModuleData(moduleData)
                setFilteredData(moduleData)
                setLoading(false)

                // get faculty list
                const facultyResponse = await fetch('/data/fullData/faculty.json')
                const facultyData = await facultyResponse.json()
                const faculties: SelectData[] = Object.values(facultyData).map((item: any) => ({
                    value: item.Faculty,
                    label: item.Faculty
                }))
                setFacultyList(prevList => [...prevList, ...faculties])
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    // filter modules by query
    useEffect(() => {
        let filterQueryData: ModuleMetaData[] = []
        for (const modData of moduleData) {
            if ((filter.faculty === "All Faculties" || filter.faculty === modData.faculty.Faculty) && 
                (filter.query === "" || modData.module.toLowerCase().includes(filter.query.toLowerCase()) || modData.code.toLowerCase().includes(filter.query.toLowerCase()) )) {
                filterQueryData.push(modData)
            }
        }
        setFilteredData(filterQueryData)
        setCurrentPage(0)
    }, [filter])

    // Getting current posts based on pagination
    const postsPerPage: number = 10
    const indexOfFirstPost: number = currentPage * postsPerPage
    const indexOfLastPost: number = indexOfFirstPost + postsPerPage
    const currentPosts: ModuleMetaData[] = filteredData.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <>
            {loading ? 
                <div className="w-full">
                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(5)].map((_,index) => (
                            <div key={index} className="border-2 border-slate-200 rounded-lg p-4">
                                <Skeleton active />
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className="w-full h-full flex flex-col items-center">
                    <div className="w-full">
                        <ModuleFilter facultyList={facultyList} filter={filter} setFilter={setFilter} />
                    </div>
                    <Divider className="w-full" orientation="right" plain orientationMargin="0">
                        {filteredData.length} courses found
                    </Divider>
                    {filteredData.length > 0 ? 
                        <>
                            <div className="w-full">
                                <Modules modules={currentPosts} />
                            </div>
                            <div className="py-8">
                                <Pagination onChange={(value) => setCurrentPage(value-1)} defaultCurrent={1} total={filteredData.length} />
                            </div>
                        </>
                        :
                        <div className="w-full">
                            No Modules found!
                        </div>
                    }
                </div>
            }
        </>
    )
}