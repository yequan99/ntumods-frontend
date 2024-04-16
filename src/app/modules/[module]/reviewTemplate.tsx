'use client'

import { useState } from 'react'
import moment from 'moment'
import Avatar from 'react-avatar'
import { Divider } from 'antd'

import ReviewForm from './reviewForm'
import { ThreadReviewData } from "@/utils/types"

export default function ReviewTemplate({isMainThread, mainThreadReviews}: {isMainThread: boolean, mainThreadReviews?: ThreadReviewData[]}) {
    const [selectReply, setSelectReply] = useState<boolean>(false)
    const [replyID, setReplyID] = useState<string>("")
    
    const getDateDiff = (date: Date) => {
        const dateTimeAgo = moment(new Date(date)).fromNow()
        return dateTimeAgo 
    }

    const handleReply = (threadId: string) => {
        setSelectReply(!selectReply)
        setReplyID(threadId)
    }

    return (
        <div className={`w-full h-full ${isMainThread ? "" : "pt-4"}`}>
            {mainThreadReviews?.map((mainThread,index) => (
                <div key={index} className="pb-4 w-full">
                    <div className="flex flex-row h-fit items-center">
                        <div className="w-12 pl-1">
                            <Avatar name={mainThread.userId} size="43" round="10px" />
                        </div>
                        <div className="pl-3">
                            <p className="text-blue-800 font-medium text-xl">{mainThread.userId}</p>
                            <p className="text-slate-500 text-sm italic">{getDateDiff(new Date(mainThread.timestamp * 1000))}</p>
                        </div>
                    </div>
                    <div className="flex flex-row pt-4 h-full md:w-[60%]">
                        <div className="w-12 flex items-center justify-center">
                            <Divider type="vertical" className="bg-slate-400 h-full" />
                        </div>
                        <div className="pl-3 w-full">
                            <p className="pb-2">{mainThread.review}</p>
                            {isMainThread &&
                                <h1 className="pt-2 font-semibold text-slate-500 text-sm hover:cursor-pointer w-fit" onClick={() => handleReply(mainThread.reviewId)}>
                                    Reply
                                </h1>
                            }
                            {
                                selectReply && mainThread.reviewId === replyID &&
                                <div className="pt-4">
                                    <ReviewForm type="Reply" />
                                </div>
                            }
                            {
                                isMainThread &&
                                <ReviewTemplate isMainThread={false} mainThreadReviews={mainThread.replies} />
                            }
                        </div>
                    </div>                    
                </div>
            ))}
        </div>
    )
}