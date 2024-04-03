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
    Schedules: Schedule[]
}

export type Schedule = {
    StartTime: string,
    EndTime: string,
    Venue: string,
    ClassType: string,
    Index: string,
    IndexGroup: string,
    DayOfWeek: string
}

export type ScheduleEvent = {
    Index: string,
    ClassType: string,
    IndexGroup: string,
    StartTime: string,
    EndTime: string,
    Venue: string,
    DayOfWeek: string,
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