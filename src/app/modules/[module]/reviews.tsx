'use client'

import moment from 'moment'
import ReviewTemplate from './reviewTemplate'
import { ThreadReviewData } from "@/utils/types"
import { upvote, downvote } from '@/utils/icons'

export default function Reviews({reviews}: {reviews: ThreadReviewData[]}) {

    return (
        <div className="w-full h-full">
            <h1 className="font-bold text-slate-500 text-2xl pb-4">Reviews and Discussions</h1>
            <ReviewTemplate isMainThread={true} mainThreadReviews={reviews} />
        </div>
    )
}