import { PostReplyData } from "@/utils/types"

export default async function PostReply(data: PostReplyData) {
    try {
        // const reviewResponse = await fetch(
        //     `/reply`,
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