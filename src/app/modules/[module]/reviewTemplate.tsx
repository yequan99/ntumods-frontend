'use client'

import { useState } from 'react'
import moment from 'moment'
import Avatar from 'react-avatar'
import { Divider } from 'antd'

import ReviewForm from './reviewForm'
import { ThreadReviewData } from "@/utils/types"
import { upvote, downvote } from '@/utils/icons'

export default function ReviewTemplate({isMainThread, mainThreadReviews}: {isMainThread: boolean, mainThreadReviews?: ThreadReviewData[]}) {
    const [selectReply, setSelectReply] = useState<boolean>(false)
    const [replyID, setReplyID] = useState<number>(0)
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo 
    }

    const handleReply = (replyID: number) => {
        setSelectReply(!selectReply)
        setReplyID(replyID)
    }

    return (
        <div className={`w-full h-full ${isMainThread ? "" : "pt-4"}`}>
            {mainThreadReviews?.map((mainThread,index) => (
                <div key={index} className="pb-6 pt-2 w-full flex flex-row">
                    <div className="w-[5%] h-full flex flex-col items-center">
                        <div className="h-fit">
                            <Avatar name={mainThread.Author} size="43" round="10px" />
                        </div>
                        <div className="h-full">
                            <Divider type="vertical" className="bg-slate-400 h-20 mt-6" />
                        </div>
                    </div>
                    <div className="w-[95%] pl-6 md:pl-2 h-full">
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
                                <h1 className="font-semibold text-slate-500 text-sm px-2 hover:cursor-pointer" onClick={() => handleReply(mainThread.Date)}>Reply</h1>
                            </li>
                            }
                        </ul>
                        {
                            selectReply && mainThread.Date === replyID &&
                            <div className="pt-4 w-[60%]">
                                <ReviewForm type="Reply" />
                            </div>
                        }
                        {
                            isMainThread &&
                            <ReviewTemplate isMainThread={false} mainThreadReviews={mainThread.SubThreads} />
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}