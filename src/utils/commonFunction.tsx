// 0.5 hrs -> span 10
// 1 hr -> span 20 
// offset = gridrow 2
// 0.5 hrs -> gridrow 10
// 1 hr -> gridrow 20

export function CalculateGridRow(startTimeString: string, endTimeString: string) {
    var startTime = parseInt(startTimeString, 10)
    var endTime = parseInt(endTimeString, 10)
    const timetableStart: number = 800
    const spanInterval: number = GetNumOfIntervals(startTime, endTime)
    const startGridInterval: number = GetNumOfIntervals(timetableStart, startTime)
    var startGrid = (startGridInterval * 10) + 2 + Math.floor(startGridInterval / 3)
    var span = (spanInterval * 10) + Math.floor(spanInterval / 3)

    return [startGrid.toString(), span.toString()]
}

export function GetNumOfIntervals(startTime: number, endTime:number) {
    var start = Math.floor(startTime / 100) * 60 + (startTime % 100)
    var end = Math.floor(endTime / 100) * 60 + (endTime % 100)

    var diffInMinutes = Math.abs(end - start)
    var numOfIntervals = Math.ceil(diffInMinutes / 30)

    return numOfIntervals
}