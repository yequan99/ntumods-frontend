'use client'

import { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import PostReview from '@/api/PostReview'
import PostReply from '@/api/PostReply'
import { PostReviewData, PostReplyData, StoreUserData } from '@/utils/types'
import { tick } from '@/utils/icons'

const getLocalStorage = () => {
    if (typeof window !== undefined) {
        const storedUser = window.localStorage.getItem('username')
        if (storedUser) {
            const parsedData: StoreUserData = JSON.parse(storedUser) as StoreUserData
            return parsedData
        }
        return null
    }
    return null
}

const setLocalStorage = (storeObject: StoreUserData) => {
    if (typeof window !== undefined) {
        window.localStorage.setItem('username', JSON.stringify(storeObject))
    }
}

export default function ReviewForm({reviewId, module}: {reviewId?: string, module: string}) {
    const [review, setReview] = useState<string>("")
    const [name, setName] = useState<string | null>(null)
    const [user, setUser] = useState<StoreUserData | null>(null)
    const [isNameEmpty, setIsNameEmpty] = useState<boolean>(false)
    const [isReviewEmpty, setIsReviewEmpty] = useState<boolean>(false)
    const [submitted, setSubmitted] = useState<boolean>(false)

    const { TextArea } = Input

    useEffect(() => {
        const storedUser: StoreUserData | null = getLocalStorage()
        if (storedUser) {
            setName(storedUser.username)
            setUser(storedUser)
        }
    }, [])


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
        if (name === "" || name === null) {
            setIsNameEmpty(true)
        }
        if (review === "") {
            setIsReviewEmpty(true)
        }
        if (name !== null && review !== "") {
            // submit form
            const handlePostReview = async (uuid: string, username: string) => {
                const reviewData: PostReviewData = {uuid: uuid, username: username, module: module, review: review}
                const postReview = await PostReview(reviewData)
            }
            const handlePostReply = async (uuid: string, username: string) => {
                const replyData: PostReplyData = {uuid: uuid, username: username, module: module, reviewId: reviewId!, reply: review}
                const postReply = await PostReply(replyData)
            }
            // get uuid
            setSubmitted(true)
            var retrievedUUID: string = ""
            var retrievedName: string = ""
            if (user !== null) {
                retrievedUUID = user.uuid
                retrievedName = user.username
            } else {
                retrievedName = name
                retrievedUUID = uuidv4()

                // need to store user in local storage
                const storeUser: StoreUserData = {uuid: retrievedUUID, username: retrievedName}
                setLocalStorage(storeUser)
            }

            if (reviewId === undefined) {
                handlePostReview(retrievedUUID, retrievedName)
            } else {
                handlePostReply(retrievedUUID, retrievedName)
            }
            
            setUser({uuid: retrievedUUID, username: retrievedName})
            setReview("")
            window.location.reload()
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
                        disabled={user !== null}
                        onChange={(e) => updateReviewForm("name", e.target.value)}
                        status={isNameEmpty ? "error" : ""} 
                        placeholder="Name" 
                        value={name!}
                    />
                </div>
                <div className="mt-2">
                    <Button className="" onClick={handleSubmit}>
                        {
                            !submitted ?
                            <h1>Submit</h1>
                            :
                            <div className="flex flex-row items-center">
                                <div className="w-5 h-5">{tick}</div>
                                <h1 className="pl-2">Submitted</h1>
                            </div>
                        }
                    </Button>
                </div>
            </div>
        </>
    )
}