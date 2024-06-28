import React from 'react'
import JobsList from './JobsList'
import { Spin ,Empty} from 'antd'
import { useGetJobsQuery } from '../../features/job/jobApiSlice'


const Jobs = () => {
    const { data , isLoading, isSuccess, isError } = useGetJobsQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <JobsList jobs={data?.jobs} />
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

export default Jobs