import React from 'react'
import PostsList from './PostsList'
import { Spin ,Empty} from 'antd'
import { useGetPostsQuery } from '../../features/post/postApiSlice'
const NewPosts = () => {
    const { data , isLoading, isSuccess, isError } = useGetPostsQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <PostsList posts={data?.posts} />
        )
        if(!data?.posts || data?.posts?.length===0){
            content=<Empty />
        }
    } 
    return (
        <>
            {content}
        </>
    )
}

export default NewPosts