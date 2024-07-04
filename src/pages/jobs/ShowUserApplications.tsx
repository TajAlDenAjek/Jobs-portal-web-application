import React from 'react'
import ListOfApplications from './ListOfApplications'
import { Spin ,Empty} from 'antd'
import { useGetUserJobsApplicationsQuery } from '../../features/job/jobApiSlice'

const ShowUserApplications = () => {
    const { data , isLoading, isSuccess, isError } = useGetUserJobsApplicationsQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <ListOfApplications apps={data?.apps} isUserPage={true}/>
        )
        if(!data?.apps || data?.apps?.length===0){
            content=<Empty />
        }
    } 
    return (
        <>
            {content}
        </>
    )
}

export default ShowUserApplications