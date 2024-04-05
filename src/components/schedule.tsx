'use client'

import { ParsedScheduleEvent } from "@/utils/types"
import Event from "@/app/modules/[module]/event"

export default function Schedule({events}: {events: ParsedScheduleEvent[]}) {
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
                            <Event scheduleEvents={events} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}