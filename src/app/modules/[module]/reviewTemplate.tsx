'use client'

import moment from 'moment'

import { ThreadReviewData } from "@/utils/types"
import { upvote, downvote } from '@/utils/icons'

export default function ReviewTemplate({isMainThread, mainThreadReviews}: {isMainThread: boolean, mainThreadReviews?: ThreadReviewData[]}) {
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo 
    }

    return (
        <div className={`w-full h-full ${isMainThread ? "" : "pt-4"}`}>
            {mainThreadReviews?.map((mainThread,index) => (
                <div key={index} className="pb-6 pt-2 w-full flex flex-row">
                    <div className="w-[5%]">
                        {mainThread.Author}
                    </div>
                    <div className="w-[95%]">
                        <p className="text-blue-800 font-medium text-xl">{mainThread.Author}</p>
                        <p className="text-slate-500 text-sm italic pb-4">{getDateDiff(new Date(mainThread.Date * 1000))}</p>
                        <p className="pb-2">{mainThread.Comment}</p>
                        <ul className="flex items-center pt-2">
                            <li className="flex pr-4 items-center">
                                <div className="pr-2 hover:cursor-pointer">{upvote}</div>
                                <div className="text-xs">{mainThread.Upvotes}</div>
                            </li>
                            <li className="flex pr-4 items-center">
                                <div className="pr-2 hover:cursor-pointer">{downvote}</div>
                                <div className="text-xs">{mainThread.Downvotes}</div>
                            </li>
                            {isMainThread &&
                            <li>
                                <h1 className="font-semibold text-slate-500 text-sm px-2 hover:cursor-pointer">Reply</h1>
                            </li>
                            }
                        </ul>
                        {isMainThread &&
                            <ReviewTemplate isMainThread={false} mainThreadReviews={mainThread.SubThreads} />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}