import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import CurrenetUserPosts from './CurrenetUserPosts';
import NewPosts from './NewPosts';
import './style.scss'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Posts',
    children: <NewPosts/>,
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