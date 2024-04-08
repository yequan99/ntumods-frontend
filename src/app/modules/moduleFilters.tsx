'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Select, Input } from 'antd';

import { FilterData } from '@/utils/types';

let timer: NodeJS.Timeout | null = null

export default function ModuleFilter({filter, setFilter}:{filter: FilterData, setFilter: Dispatch<SetStateAction<FilterData>>}) {

    const handleQueryChange = (e:  ChangeEvent<HTMLInputElement>) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setFilter(prevFilter => ({
                ...prevFilter,
                query: e.target.value
            }))
        }, 1000) 
    }

    const handleFacultyChange = (selectedOptions: string) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            faculty: selectedOptions
        }))
    }

    return (
        <div className="grid grid-cols-6 gap-4 h-10">
            <div className="col-span-4">
                <Input 
                    className="w-full h-full" 
                    placeholder="Search for module name or code" 
                    allowClear={true}
                    onChange={(e) => handleQueryChange(e)}
                />
            </div>
            <div className="col-span-2">
                <Select
                    className="w-full h-full"
                    defaultValue={filter.faculty}
                    onChange={(selectOption) => handleFacultyChange(selectOption)}
                    options={[
                        { value: 'All Faculties', label: 'All Faculties' },
                        { value: 'Accountancy', label: 'Accountancy' },
                        { value: 'Art, Design & Media', label: 'Art, Design & Media' },
                        { value: 'Aerospace Engineering', label: 'Aerospace Engineering' },
                        { value: 'School of Computer Science and Engineering', label: 'School of Computer Science and Engineering' },
                    ]}
                />
            </div>
        </div>
    )
}