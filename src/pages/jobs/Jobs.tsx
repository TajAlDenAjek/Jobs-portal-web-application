import React from 'react'
import JobsList from './JobsList'
import { Spin ,Empty} from 'antd'
import { useGetPostsQuery } from '../../features/post/postApiSlice'


const Jobs = () => {
    const { data , isLoading, isSuccess, isError } = useGetPostsQuery({})
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