import React from 'react'
import Post from './Post';
import { Row,Col } from 'antd';

interface PostList {
  posts: any[];
  isPostOwned?:boolean
}

const PostsList: React.FC<PostList> = ({
  posts,
  isPostOwned=false
}) => {
  return (
    <>
      <div className='posts-container'>
        {
          posts.map((post: any) => {
            return <Post key={post.id} post={post} isPostOwned={isPostOwned}/>;
          })
        }
      </div>
    </>
  )
}

export default PostsList