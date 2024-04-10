export type ModuleMetaData = {
    code: string,
    module: string,
    description: string,
    au: string,
    faculty: FacultyData
}

export type SelectData = {
    value: string,
    label: string
}

export type FilterData = {
    query: string,
    faculty: string
}

export type FacultyData = {
    Faculty: string,
    Code: string
}

export type ExamData = {
    date: string,
    dayOfWeek: string,
    time: string,
    code: string,
    title: string,
    duration: string
}

export type ModuleData = {
    code: string,
    title: string,
    au: string,
    prerequisite: string,
    mutually_exclusive: string,
    not_available_to: string,
    not_available_to_prog_with: string,
    grade_type: string,
    not_available_as_ue: string,
    not_available_as_pe: string,
    description: string,
    faculty: FacultyData,
    notOfferedAsBDE: boolean,
    exam: ExamData,
    schedule: ScheduleData[]
}

export type ModuleInfo = {
    title: string,
    data: string | undefined
}

export type ScheduleData = {
    startTime: string,
    endTime: string,
    venue: string,
    classType: string,
    index: string,
    indexGroup: string,
    dayOfWeek: string,
    remarks: string
}

export type RemarksData = {
    Venue: string,
    Remarks: string
}

export type ScheduleEvent = {
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Remarks: RemarksData[],
    DayOfWeek: string,
    GridRow: string[],
    BgColour: string
}

export interface ReviewData {
    Author: string,
    Comment: string,
    Upvotes: number,
    Downvotes: number,
    Date: number
}

export type SubThreadReviewData = ReviewData

export interface ThreadReviewData extends ReviewData {
    SubThreads?: SubThreadReviewData[]
}

export type SelectedModuleData = {
    code: string,
    indexes: SelectData[],
}

export type SelectedExamData = {
    code: string,
    exam: ExamData
}