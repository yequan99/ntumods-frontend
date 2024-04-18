import { PostReviewData } from "@/utils/types"

export default async function PostReview(data: PostReviewData) {
    try {
        const reviewResponse = await fetch(
            `http://ntumods-backend.southeastasia.azurecontainer.io:8080/review`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
        )
        return reviewResponse.status
    } catch (error) {
        console.log(error)
        throw error
    }
}