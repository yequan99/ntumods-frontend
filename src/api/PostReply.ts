import { PostReplyData } from "@/utils/types"

export default async function PostReply(data: PostReplyData) {
    try {
        const reviewResponse = await fetch(
            `http://ntumods-backend.southeastasia.azurecontainer.io:8080/reply`,
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