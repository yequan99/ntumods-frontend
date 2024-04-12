export default async function FetchFacultyList(semInfo: string) {
    try {
        const facultyListResponse = await fetch(
            // `https://ntumodssa.blob.core.windows.net/ntumodssc/${semInfo}/faculty.json`,
            "/data/fullData/faculty.json",
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        )
        const facultyListData = await facultyListResponse.json()
        return facultyListData
    } catch (error) {
        console.log(error)
        throw error
    }
}