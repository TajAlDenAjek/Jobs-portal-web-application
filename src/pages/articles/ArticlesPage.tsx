import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import CurrenetUserArticles from './CurrenetUserArticles';
import NewArticles from './NewArticles';
import './style.scss'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Articles',
    children: <NewArticles/>,
  },
  {
    key: '2',
    label: 'My Articles',
    children: <CurrenetUserArticles />,
  },
];

const ArticlesPage = () => {
  return (
    <div className='articles-page'>
      <Tabs defaultActiveKey="1" items={items}  />
    </div>
  )
}

export default ArticlesPage