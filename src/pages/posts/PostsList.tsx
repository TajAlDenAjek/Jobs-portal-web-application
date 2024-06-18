import React from 'react'
import Post from './Post';
import { Row,Col } from 'antd';

interface PostList {
  posts: any[];
}

const PostsList: React.FC<PostList> = ({
  posts
}) => {
  return (
    <>
      <div className='posts-container'>
        {
          posts.map((post: any) => {
            return <Post key={post.id} post={post} />;
          })
        }
      </div>
    </>
  )
}

export default PostsList