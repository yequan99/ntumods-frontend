export type ModuleMetaData = {
    moduleCode: string,
    title: string,
    description: string,
    credits: number
}

export type FilterData = {
    query: string,
    faculty: string,
    semester: string,
    moduleType: string
}

export type ModuleFullData = {
    moduleCode: string,
    title: string,
    description: string,
    credits: number,
    course: string,
    faculty: string,
    semester: string,
    moduleType: string,
    prerequisites: string[],
    exam: string,
    index: IndexData
}

export type IndexData = {
    Lecture: string[],
    Tutorial: string[],
    Lab: string[],
    Seminar: string[]
}