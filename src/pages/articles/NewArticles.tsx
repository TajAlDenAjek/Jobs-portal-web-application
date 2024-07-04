import React from 'react'
import ArticlesList from './ArticlesList'
import { Spin ,Empty} from 'antd'
import { useGetPostsQuery } from '../../features/post/postApiSlice'

const NewArticles = () => {
    const { data , isLoading, isSuccess, isError } = useGetPostsQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <ArticlesList articles={data?.article} />
        )
        if(!data?.article || data?.article?.length===0){
            content=<Empty />
        }
    } 
    return (
        <>
            {content}
        </>
    )
}

export default NewArticles