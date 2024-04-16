export type ModuleMetaData = {
    code: string,
    module: string,
    description: string,
    au: string,
    faculty: FacultyData
}

export type SelectData = {
    value: any,
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
    remarks: string,
    teachingWeeks: number[]
}

export type RemarksData = {
    Venue: string,
    Remarks: string
}

export type ScheduleEvent = {
    Code?: string,
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Remarks: RemarksData[],
    DayOfWeek: string,
    GridRow: string[],
    BgColour: string,
    TeachingWeeks?: number[],
    ClashData?: ClashData[]
}

export type ClashData = {
    Code: string,
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Remarks: RemarksData[]
}

export interface ReplyData {
    username: string,
    timestamp: number,
    review: string,
    reviewId: string,
}

export type SubThreadReviewData = ReplyData

export interface ThreadReviewData extends ReplyData {
    replies?: SubThreadReviewData[]
}

export type SelectedModuleData = {
    Code: string,
    Title: string,
    SelectedIndex: SelectData,
    IndexList: SelectData[],
    Exam: ExamData,
    Schedule: ScheduleData[]
}

export type TimetableStorageData = {
    Modules: StoreModuleData[],
    ColourMap: Map<string, string>,
    ColourIndex: number
}

export type StoreModuleData = {
    Code: string | null,
    Index: SelectData
}

export type PostReviewData = {
    uuid: string,
    username: string,
    moduleId: string,
    review: string
}

export type PostReplyData = {
    uuid: string,
    username: string,
    moduleId: string,
    reviewId: string,
    reply: string
}

export type StoreUserData = {
    uuid: string,
    username: string
}