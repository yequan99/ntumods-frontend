import { ModuleMetaData } from "@/utils/types"

export default async function FetchModuleList(semInfo: string) {
    try {
        console.log("called fetchmodulelist")
        const moduleListResponse = await fetch(
            `https://ntumodssa.blob.core.windows.net/ntumodssc/${semInfo}/moduleList.json`,
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