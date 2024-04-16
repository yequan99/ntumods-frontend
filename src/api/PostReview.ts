import { PostReviewData } from "@/utils/types"

export default async function PostReview(data: PostReviewData) {
    try {
        // const reviewResponse = await fetch(
        //     `/review`,
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data)
        //     }
        // )
        // return reviewResponse.status

        console.log(data)
        return "succeed"
    } catch (error) {
        console.log(error)
        throw error
    }
}