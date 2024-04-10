'use client'

import { useState, useEffect, Dispatch, SetStateAction,  } from 'react'
import { Select } from 'antd';

import { SelectData, ModuleMetaData, ModuleData, SelectedModuleData } from "@/utils/types"

export default function ModuleSearch({setSelectedModules}: {setSelectedModules: Dispatch<SetStateAction<SelectedModuleData[]>>}) {
    const [moduleList, setModuleList] = useState<SelectData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moduleResponse = await fetch('/data/fullData/moduleList.json')
                const moduleListData: ModuleMetaData[] = await moduleResponse.json()
                moduleListData.sort((a,b) => a.code.localeCompare(b.code))
                const listOfModules: SelectData[] = Object.values(moduleListData).map((item) => ({
                    value: item.code,
                    label: item.code + " " + item.module
                }))
                setModuleList(listOfModules)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const handleChange = (value: string) => {
        const fetchIndexes = async () => {
            try {
                
                const indexResponse = await fetch(`/data/fullData/moduleData/${value}.json`)
                const indexData: ModuleData = await indexResponse.json()

                const indexes = indexData.schedule.map(schedule => schedule.index)
                const uniqueIndexes = indexes.filter((item,index) => indexes.indexOf(item) === index)
                const addedModule: SelectedModuleData = {
                    code: value,
                    indexes: uniqueIndexes.map(item => ({
                        value: item,
                        label: item
                    }))
                }
                setSelectedModules(prevList => [...prevList, addedModule])
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchIndexes()
    }

    const filterOption = (input: string, option?: { label: string; value: string }) => 
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    
    return (
        <div>
            <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Input module to timetable"
                onChange={handleChange}
                filterOption={filterOption}
                options={moduleList}
            />
        </div>
    )
}