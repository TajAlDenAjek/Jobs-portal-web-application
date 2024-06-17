import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import PostsList from './PostsList';
import CurrenetUserPosts from './CurrenetUserPosts';
import './style.scss'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Posts',
    children: <PostsList />,
  },
  {
    key: '2',
    label: 'My Posts',
    children: <CurrenetUserPosts />,
  },
];

const PostsPage = () => {
  return (
    <div className='posts-page'>
      <Tabs defaultActiveKey="1" items={items}  />
    </div>
  )
}

export default PostsPage