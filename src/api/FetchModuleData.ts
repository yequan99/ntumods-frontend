import { ModuleData } from "@/utils/types"
import { GetSemInfo } from "@/utils/commonFunction"

export default async function FetchModuleData(moduleCode: string) {
    try {
        const moduleDataResponse = await fetch(
            `https://ntumodssa.blob.core.windows.net/ntumodssc/${GetSemInfo()}/${moduleCode}.json`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        const moduleData: ModuleData = await moduleDataResponse.json()
        return moduleData
    } catch (error) {
        console.log(error)
        throw error
    }
}