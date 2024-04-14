'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Select, Input } from 'antd';

import { FilterData, SelectData } from '@/utils/types';

let timer: NodeJS.Timeout | null = null

export default function ModuleFilter({facultyList, filter, setFilter}:{facultyList: SelectData[], filter: FilterData, setFilter: Dispatch<SetStateAction<FilterData>>}) {

    const handleQueryChange = (e:  ChangeEvent<HTMLInputElement>) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setFilter(prevFilter => ({
                ...prevFilter,
                query: e.target.value
            }))
        }, 0) 
    }

    const handleFacultyChange = (selectedOptions: string) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            faculty: selectedOptions
        }))
    }

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-6 lg:gap-4 h-10">
            <div className="lg:col-span-4">
                <Input 
                    className="w-full h-full"
                    value={filter.query}
                    placeholder="Search for module name or code" 
                    allowClear={true}
                    onChange={(e) => handleQueryChange(e)}
                />
            </div>
            <div className="pt-4 lg:pt-0 lg:col-span-2">
                <Select
                    className="w-full h-full"
                    defaultValue={filter.faculty}
                    onChange={(selectOption) => handleFacultyChange(selectOption)}
                    options={facultyList}
                />
            </div>
        </div>
    )
}