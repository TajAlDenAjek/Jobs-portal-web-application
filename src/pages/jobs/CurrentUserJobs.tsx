import React from 'react'
import JobsList from './JobsList'
import { Spin ,Empty} from 'antd'
import { useGetUserJobsQuery } from '../../features/job/jobApiSlice'


const CurrentUserJobs = () => {
    const { data , isLoading, isSuccess, isError } = useGetUserJobsQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <JobsList jobs={data?.jobs} isUserView={true} />
        )
        if(!data?.jobs || data?.jobs?.length===0){
            content=<Empty />
        }
    } 
    return (
        <>
            {content}
        </>
    )
}

export default CurrentUserJobs