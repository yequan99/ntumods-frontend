'use client'

import ReviewTemplate from './reviewTemplate'
import ReviewForm from './reviewForm'
import { ThreadReviewData } from "@/utils/types"

export default function Reviews({reviews, module}: {reviews: ThreadReviewData[], module:string}) {

    return (
        <div className="w-full h-full">
            <h1 className="font-bold text-slate-500 text-2xl pb-4">Reviews and Discussions</h1>
            <div className="w-full md:w-[80%]">
                <ReviewForm module={module} />
            </div>
            <div className="pt-4">
                <ReviewTemplate isMainThread={true} mainThreadReviews={reviews} module={module} />
            </div>
        </div>
    )
}