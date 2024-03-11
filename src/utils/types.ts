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
    Index: number,
    IndexGroup: number,
    DayOfWeek: string,
    Remarks: string
}

export type ScheduleEvent = {
    title: string,
    daysOfWeek: string[],
    startTime: string,
    endTime: string,
    extendedProps: ScheduleExtendedProps,
    color: string,
    textColor?: string
}

export type ScheduleExtendedProps = {
    description: string
}