import React from 'react'
import { Card, Image } from 'antd'
interface PostProps {
  post: any
}

const Post: React.FC<PostProps> = ({
  post
}) => {
  return (
    <Card
      bordered
      className='post-card'
    >
      hi
    </Card>

    )
}

export default Post