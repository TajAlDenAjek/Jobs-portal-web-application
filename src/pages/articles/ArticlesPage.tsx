import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import CurrenetUserArticles from './CurrenetUserArticles';
import NewArticles from './NewArticles';
import { useSelector } from "react-redux"

import './style.scss'
import { selectCurrentPermission } from '../../features/auth/authSlice';
import { Permissions } from '../../features/auth/authSlice';


const ArticlesPage = () => {
  const permission: Permissions | null = useSelector(selectCurrentPermission)
  const content = permission === "company" ? <CurrenetUserArticles /> : <NewArticles />
  return (
    <div className='articles-page'>
      {content}
    </div>
  )
}

export default ArticlesPage