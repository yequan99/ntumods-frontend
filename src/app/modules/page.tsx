'use client'

import { useState, useEffect } from "react"
import { Pagination, Divider, Skeleton } from 'antd'

import { ModuleMetaData, FilterData, SelectData } from "@/utils/types"
import Modules from "./modules"
import ModuleFilter from "./moduleFilters"
import FetchModuleList from "@/api/FetchModuleList"
import FetchFacultyList from "@/api/FetchFacultyList";
import { usePathname, useRouter } from "next/navigation";

const facultyCodeMap: Map<string, string> = new Map([
    ["all", "All Faculties"]
])

type ParamType = {
    faculty: string,
    query: string
}

export default function CoursesPage({ searchParams }: {searchParams: ParamType}) {
    const router = useRouter()
    const pathname = usePathname()

    const [loading, setLoading] = useState<boolean>(true)
    const [moduleData, setModuleData] = useState<ModuleMetaData[]>([])
    const [filteredData, setFilteredData] = useState<ModuleMetaData[]>([])
    const [filter, setFilter] = useState<FilterData>({query: (searchParams.query === undefined || searchParams.query === "") ? "" : searchParams.query, faculty: (searchParams.faculty === undefined || searchParams.faculty === "") ? "all" : searchParams.faculty})
    const [facultyList, setFacultyList] = useState<SelectData[]>([{ value: 'all', label: 'All Faculties' }])
    const [currentPage, setCurrentPage] = useState<number>(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get faculty list
                const facultyData = await FetchFacultyList()
                const faculties: SelectData[] = Object.values(facultyData).map((item: any) => ({
                    value: item.Code,
                    label: item.Faculty
                }))
                setFacultyList(prevList => [...prevList, ...faculties])
                
                Object.values(facultyData).map((faculty: any) => (
                    facultyCodeMap.set(faculty.Code, faculty.Faculty)
                ))
                
                // check for search params
                const query: string = searchParams.query
                const faculty: string = searchParams.faculty

                const prevFilter: FilterData = {query: (query === undefined || query === "") ? "" : query, faculty: (faculty === undefined || faculty === "") ? "all" : faculty}
                setFilter(prevFilter)

                // get module list
                const newModuleData: ModuleMetaData[] = await FetchModuleList()
                newModuleData.sort((a,b) => a.code.localeCompare(b.code))

                setModuleData(newModuleData)

                if (query === null && faculty === null) {
                    setFilteredData(newModuleData)
                } else {
                    const newFilteredData: ModuleMetaData[] = handleFilter(newModuleData, prevFilter)
                    setFilteredData(newFilteredData)
                }
                
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    // filter modules by query
    useEffect(() => {
        const newFilteredData: ModuleMetaData[] = handleFilter(moduleData, filter)
        setFilteredData(newFilteredData)
        setCurrentPage(0)
        if (filter.query !== "" && filter.faculty !== "") {
            router.push(pathname + '?' + `faculty=${filter.faculty}` + '&' + `query=${filter.query}`)
        } else if (filter.query !== "") {
            router.push(pathname + '?' + `query=${filter.query}`)
        } else {
            router.push(pathname + '?' + `faculty=${filter.faculty}`)
        }
    }, [filter])

    const handleFilter = (prefilteredData: ModuleMetaData[], chosenFilter: FilterData) => {
        let filterQueryData: ModuleMetaData[] = []
        for (const preData of prefilteredData) {
            if ((facultyCodeMap.get(chosenFilter.faculty) === "All Faculties" || facultyCodeMap.get(chosenFilter.faculty) === preData.faculty.Faculty) && 
                (chosenFilter.query === "" || preData.module.toLowerCase().includes(chosenFilter.query.toLowerCase()) || preData.code.toLowerCase().includes(chosenFilter.query.toLowerCase()) )) {
                filterQueryData.push(preData)
            }
        }
        return filterQueryData
    }

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
                    <div className="w-full h-fit pb-16 lg:pb-0">
                        <ModuleFilter facultyList={facultyList} filter={filter} setFilter={setFilter} />
                    </div>
                    <div className="w-full hidden lg:block">
                        <Divider className="w-full" orientation="right" plain orientationMargin="0">
                            {filteredData.length} courses found
                        </Divider>
                    </div>
                    {filteredData.length > 0 ? 
                        <>
                            <div className="w-full">
                                <Modules modules={currentPosts} />
                            </div>
                            <div className="py-8">
                                <Pagination onChange={(value) => setCurrentPage(value-1)} defaultCurrent={1} total={filteredData.length} showSizeChanger={false} />
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