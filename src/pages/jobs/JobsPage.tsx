import type { TabsProps } from 'antd'
import { Tabs } from 'antd'
import CurrentCompanyJobs from './CurrentCompanyJobs';
import Jobs from './Jobs';
import { useSelector } from "react-redux"
import { selectCurrentPermission } from '../../features/auth/authSlice';
import { Permissions } from '../../features/auth/authSlice';
import CurrentUserJobs from './CurrentUserJobs';
import ShowUserApplications from './ShowUserApplications';
import './style.scss'


const companyItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'View Jobs With Appliers ',
        children: <Jobs showAppliers={true} />,
    },
    {
        key: '2',
        label: 'Manage Jobs',
        children: <CurrentCompanyJobs />,
    },
];

const JobSeekerItems: TabsProps['items'] = [
    {
        key: '1',
        label: 'Jobs',
        children: <CurrentUserJobs/>,
    },
    {
        key: '2',
        label: 'Show applications status',
        children: <ShowUserApplications />,
    },
];
const JobsPage = () => {
    const permission: Permissions | null = useSelector(selectCurrentPermission)
    const items =  permission === "company" ? companyItems : JobSeekerItems

    return (
        <div className='jobs-page'>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    )
}

export default JobsPage