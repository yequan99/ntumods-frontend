'use client'

import { ScheduleEvent } from "@/utils/types"

export default function Schedule({scheduleEvents}: {scheduleEvents: ScheduleEvent[]}) {

    return (
        <div className="flex h-full flex-col">
            <div className="isolate flex flex-auto flex-col overflow-auto bg-white">
                <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
                    <div
                        className="sticky top-0 z-30 flex-none bg-white shadow ring-1 ring-black ring-opacity-5 sm:pr-8"
                    >
                        <div className="-mr-px hidden grid-cols-5 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 sm:grid">
                            <div className="col-end-1 w-14" />
                            <div className="flex items-center justify-center py-3">
                                <span>Mon</span>
                            </div>
                            <div className="flex items-center justify-center py-3">
                                <span>Tue</span>
                            </div>
                            <div className="flex items-center justify-center py-3">
                                <span>Wed</span>
                            </div>
                            <div className="flex items-center justify-center py-3">
                                <span>Thu</span>
                            </div>
                            <div className="flex items-center justify-center py-3">
                                <span>Fri</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-auto">
                        <div className="sticky left-0 z-10 w-14 flex-none bg-white ring-1 ring-gray-100" />
                        <div className="grid flex-auto grid-cols-1 grid-rows-1">
                            {/* Horizontal lines */}
                            <div
                                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                                style={{ gridTemplateRows: 'repeat(26, minmax(3.5rem, 1fr))' }}
                            >
                                <div className="row-end-1 h-7"></div>
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    8AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    9AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    10AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    11AM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    12PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    1PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    2PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    3PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    4PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    5PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    6PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    7PM
                                </div>
                                </div>
                                <div />
                                <div>
                                <div className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                                    8PM
                                </div>
                                </div>
                                <div />
                            </div>

                            {/* Vertical lines */}
                            <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-5 grid-rows-1 divide-x divide-gray-100 sm:grid sm:grid-cols-5">
                                <div className="col-start-1 row-span-full" />
                                <div className="col-start-2 row-span-full" />
                                <div className="col-start-3 row-span-full" />
                                <div className="col-start-4 row-span-full" />
                                <div className="col-start-5 row-span-full" />
                                <div className="col-start-6 row-span-full w-8" />
                            </div>

                            {/* Events */}
                            {/* 0.5 hrs -> span 11
                                1 hr -> span 22 */}
                            {/* offset = gridrow 2
                                0.5 hrs -> gridrow 11
                                1 hr -> gridrow 11*/}
                            <ol
                                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-5 sm:pr-8"
                                style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
                            >
                                {scheduleEvents.map((eventSchedule,index) => (
                                    <li key={index} className={`relative mt-px flex sm:col-start-${eventSchedule.DayOfWeek}`} style={{ gridRow: `${eventSchedule.GridRow[0]} / span ${eventSchedule.GridRow[1]}` }}>
                                        <a
                                            className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-${eventSchedule.BgColour}-50 p-2 text-xs leading-5 hover:bg-${eventSchedule.BgColour}-100`}
                                        >
                                            <p className="order-1 text-gray-700">{eventSchedule.StartTime}-{eventSchedule.EndTime}</p>
                                            <p className="order-2 text-gray-700">{eventSchedule.Venue}</p>
                                            <div className="flex flex-row">
                                                <p className="text-black font-semibold pr-2">{eventSchedule.Index}</p>
                                                <p className={`text-${eventSchedule.BgColour}-500 font-semibold pr-2`}>{eventSchedule.ClassType}</p>
                                                <p className="text-gray-500">({eventSchedule.IndexGroup})</p>
                                            </div>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
