import React from 'react'
import Post from './Post';
interface PostList {
  posts: any[];
}

const PostsList: React.FC<PostList> = ({
  posts
}) => {
  return (
    <>
      <div>
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