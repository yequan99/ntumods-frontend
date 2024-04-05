'use client'

import { useState } from 'react'
import { Input, Button } from 'antd'
import { useRouter } from 'next/navigation'

export default function ReviewForm({type}: {type: string}) {
    const router = useRouter()
    const [review, setReview] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false)
    const [isReviewEmpty, setIsReviewEmpty] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<string>("Submit")

    const { TextArea } = Input

    const updateReviewForm = (type: string, e: string) => {
        if (type === "review") {
            setReview(e)
            setIsReviewEmpty(false)
        }
        else if (type === "name") {
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
            setSubmitted("Submitted")
            setReview("")
            setName("")
            // router.push('/modules/AB0403#reviews')
        }
    }

    return (
        <>
            <TextArea
                value={review}
                status={isReviewEmpty ? "error" : ""}
                onChange={(e) => updateReviewForm("review", e.target.value)}
                placeholder={`Leave a ${type}`}
                autoSize={{ minRows: 5, maxRows: 5 }}
            />
            <div className="w-full flex flex-row justify-between">
                <div className="mt-2">
                    <Input 
                        onChange={(e) => updateReviewForm("name", e.target.value)}
                        status={isNameEmpty ? "error" : ""} 
                        placeholder="Name" 
                    />
                </div>
                <div className="mt-2">
                    <Button className="" onClick={handleSubmit}>{submitted}</Button>
                </div>
            </div>
        </>
    )
}