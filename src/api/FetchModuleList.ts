import { ModuleMetaData } from "@/utils/types"
import { GetSemInfo } from "@/utils/commonFunction"

export default async function FetchModuleList() {
    try {
        const moduleListResponse = await fetch(
            `https://ntumodssa.blob.core.windows.net/ntumodssc/${GetSemInfo()}/moduleList.json`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        const moduleListData: ModuleMetaData[] = await moduleListResponse.json()
        return moduleListData
    } catch (error) {
        console.log(error)
        throw error
    }
}