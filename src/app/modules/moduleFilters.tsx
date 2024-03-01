'use client'

import { Select, Input } from 'antd';

export default function ModuleFilter() {
    return (
        <div className="grid grid-cols-6 gap-4 h-10 mb-8">
            <div className="col-span-2">
                <Input 
                    className="w-full h-full" 
                    placeholder="Search for module name or code" 
                    allowClear={true}
                />
            </div>
            <div className="col-span-2">
                <Select
                    className="w-full h-full"
                    defaultValue="All Faculties"
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
                defaultValue="All Semesters"
                options={[
                    { value: 'All', label: 'All Semesters' },
                    { value: '1', label: 'Semester 1' },
                    { value: '2', label: 'Semester 2' },
                ]}
            />
            <Select
                className="w-full h-full"
                defaultValue="All Module Types"
                options={[
                    { value: 'All', label: 'All Module Types' },
                    { value: 'Core', label: 'Core' },
                    { value: 'BDE', label: 'BDE' },
                ]}
            />
        </div>
    )
}