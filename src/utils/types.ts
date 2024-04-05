export type ModuleMetaData = {
    moduleCode: string,
    title: string,
    description: string,
    credits: number,
    semesters: string[],
    faculty: string,
    moduleType: string
}

export type FilterData = {
    query: string,
    faculty: string,
    semester: string[],
    moduleType: string
}

export type FacultyData = {
    Faculty: string,
    FacultyCode: string
}

export type ExamData = {
    Date: string,
    DayOfWeek: string,
    Time: string,
    Code: string,
    Title: string,
    Duration: string
}

export type ModuleData = {
    Code: string,
    Title: string,
    AU: string,
    Course: string,         // need to cnfm
    Faculty: string,        // need to cnfm
    Prerequisite: string,
    MutuallyExclusive: string,
    NotAvailableTo: string,
    NotAvailableToProgWith: string,
    GradeType: string,
    NotAvailableAsUE: string,
    NotAvailableAsPE: string,
    Description: string,
    // Faculty: FacultyData,
    // NotOfferedAsBDE: boolean,
    // Exam: ExamData,
    Schedules: ScheduleData[]
}

export type ScheduleData = {
    StartTime: string,
    EndTime: string,
    Venue: string,
    ClassType: string,
    Index: string,
    IndexGroup: string,
    DayOfWeek: string,
    Remarks: string
}

export type ScheduleEvent = {
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Venue: string,
    DayOfWeek: string,
    Remarks: string,
    GridRow: string[],
    BgColour: string
}

export type ParsedScheduleEvent = {
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Venue: string,
    DayOfWeek: string,
    GridRow: string[],
    BgColour: string,
    OtherIndexes: string[]
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