'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react';
import { Select, Input } from 'antd';

import { FilterData } from '@/utils/types';

let timer: NodeJS.Timeout | null = null

export default function ModuleFilter({filter, setFilter}:{filter: FilterData, setFilter: Dispatch<SetStateAction<FilterData>>}) {

    const handleChange = (e:  ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="grid grid-cols-6 gap-4 h-10">
            <div className="col-span-2">
                <Input 
                    className="w-full h-full" 
                    placeholder="Search for module name or code" 
                    allowClear={true}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="col-span-2">
                <Select
                    className="w-full h-full"
                    defaultValue={filter.faculty}
                    options={[
                        { value: 'All', label: 'All Faculties' },
                        { value: 'ACC', label: 'Accountancy' },
                        { value: 'ADM', label: 'Art, Design & Media' },
                        { value: 'AERO', label: 'Aerospace Engineering' },
                        { value: 'CSC', label: 'Computer Science' },
                    ]}
                />
            </div>
            <Select
                className="w-full h-full"
                defaultValue={filter.semester}
                options={[
                    { value: 'All Semesters', label: 'All Semesters' },
                    { value: 'Semester 1', label: 'Semester 1' },
                    { value: 'Semester 2', label: 'Semester 2' },
                ]}
            />
            <Select
                className="w-full h-full"
                defaultValue={filter.moduleType}
                options={[
                    { value: 'All', label: 'All Module Types' },
                    { value: 'Core', label: 'Core' },
                    { value: 'BDE', label: 'BDE' },
                ]}
            />
        </div>
    )
}