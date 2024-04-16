'use client'

import { useState } from 'react'
import { Input, Button } from 'antd'
import { useRouter } from 'next/navigation'

import PostReview from '@/api/PostReview'
import { PostReviewData } from '@/utils/types'

export default function ReviewForm({reviewId, module}: {reviewId?: string, module: string}) {
    const router = useRouter()
    const [review, setReview] = useState<string>("")
    const [name, setName] = useState<string | null>(null)
    const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false)
    const [isReviewEmpty, setIsReviewEmpty] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const { TextArea } = Input

    const updateReviewForm = (formType: string, e: string) => {
        if (formType === "review") {
            setReview(e)
            setIsReviewEmpty(false)
        }
        else if (formType === "name") {
            setName(e)
            setIsNameEmpty(false)
        }
    }

    const handleSubmit = () => {
        if (name === "") {
            setIsNameEmpty(true)
        }
        if (review === "") {
            setIsReviewEmpty(true)
        }
        if (name !== "" && review !== "") {
            // submit form
            const handlePost = async () => {
                const postReview = await PostReview({uuid: "sdf", username: "asdf", module: module, review: review})
                // const response = await PostReview(postReview)
            }
            handlePost()
            setSubmitted(true)
            setName("")
            setReview("")
        }
    }

    return (
        <>
            <TextArea
                value={review}
                status={isReviewEmpty ? "error" : ""}
                onChange={(e) => updateReviewForm("review", e.target.value)}
                placeholder={`Leave a ${reviewId === undefined ? "Review" : "Reply"}`}
                autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <div className="w-full flex flex-row justify-between">
                <div className="mt-2 w-full mr-2 md:w-fit md:mr-0">
                    <Input 
                        // disabled={name !== null && submitted}
                        onChange={(e) => updateReviewForm("name", e.target.value)}
                        status={isNameEmpty ? "error" : ""} 
                        placeholder="Name" 
                        value={name!}
                    />
                </div>
                <div className="mt-2">
                    <Button className="" onClick={handleSubmit}>{submitted ? "Submitted" : "Submit"}</Button>
                </div>
            </div>
        </>
    )
}