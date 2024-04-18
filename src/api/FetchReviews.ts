import { ThreadReviewData } from "@/utils/types"

export default async function FetchReviews(moduleCode: string): Promise<ThreadReviewData[]> {
    try {
        const reviewResponse = await fetch(
            `http://ntumods-backend.southeastasia.azurecontainer.io:8080/review/${moduleCode}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        const reviewData: ThreadReviewData[] = await reviewResponse.json()
        return reviewData
    } catch (error) {
        console.log(error)
        throw error
    }
}