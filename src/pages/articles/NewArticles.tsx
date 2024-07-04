import React from 'react'
import ArticlesList from './ArticlesList'
import { Spin ,Empty} from 'antd'
import { useGetArticlesQuery } from '../../features/articles/articlesApiSlice'
const NewArticles = () => {
    const { data , isLoading, isSuccess, isError } = useGetArticlesQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <ArticlesList articles={data?.articles} />
        )
        if(!data?.articles || data?.articles?.length===0){
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