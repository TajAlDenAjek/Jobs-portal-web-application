import React from 'react'
import Article from './Article';
import { Row,Col } from 'antd';

interface ArticleList {
  articles: any[];
  isArticleOwned?:boolean
}

const ArticlesList: React.FC<ArticleList> = ({
  articles,
  isArticleOwned=false
}) => {
  return (
    <>
      <div className='articles-container'>
        {
          articles.map((article: any) => {
            return <Article key={article._id} article={article} isArticleOwned={isArticleOwned}/>;
          })
        }
      </div>
    </>
  )
}

export default ArticlesList