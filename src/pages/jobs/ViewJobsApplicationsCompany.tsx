import React from 'react'
import ListOfApplications from './ListOfApplications'
import { Spin ,Empty} from 'antd'
import { useGetApplicationsOnJobQuery } from '../../features/job/jobApiSlice'

const ViewJobsApplicationsCompany = ({id}:any) => {

    const { data , isLoading, isSuccess, isError } = useGetApplicationsOnJobQuery(id)
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <ListOfApplications apps={data?.apps} />
        )
        if(!data?.apps || data?.apps?.length===0){
            content=<>
                <Empty />
                No applications yet !
            </>
        }
    } 
    return (
        <>
            {content}
        </>
    )
}

export default ViewJobsApplicationsCompany