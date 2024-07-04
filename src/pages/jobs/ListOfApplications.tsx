import React from 'react'
import JobApplication from './JobApplication';
import { Row,Col } from 'antd';

interface ListOfApplicationsProps {
  apps: any[];
  isUserPage?:boolean
}

const ListOfApplications: React.FC<ListOfApplicationsProps> = ({
  apps,
  isUserPage=false
}) => {
  return (
    <>
      <div className='apps-container'>
        {
          apps.map((app: any) => {
            return <JobApplication key={app._id} app={app} isUserPage={isUserPage}/>;
          })
        }
      </div>
    </>
  )
}

export default ListOfApplications