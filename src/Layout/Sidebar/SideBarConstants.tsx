import { PicCenterOutlined, UserOutlined ,TeamOutlined ,DollarOutlined,FileTextOutlined } from '@ant-design/icons';
import React from 'react'

interface SideBarPage {
    key: any,
    icon: any,
    label: any,
    url:any
}

export const adminPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `first admin route`,
        url:'/firstAdmin'
    }
]

export const jobSeekerPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Posts`,
        url:'/posts'
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: `Profile`,
        url:'/job-seeker-profile'
    },
    {
        key: '3',
        icon: React.createElement(TeamOutlined),
        label: `Companies`,
        url:'/companies'
    },
    {
        key: '4',
        icon: <DollarOutlined/>,
        label: `Jobs`,
        url:'/jobs'
    },
    {
        key: '5',
        icon: <FileTextOutlined />,
        label: `Articles`,
        url:'/articles'
    },
]

// to do change icons + add it to routes and go for adming pages
export const companyPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Posts`,
        url:'/posts'
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: `Company profile`,
        url:'/company-profile'
    },
    {
        key: '3',
        icon: React.createElement(TeamOutlined),
        label: `Find Candidates`,
        url:'/candidates'
    },
    {
        key: '4',
        icon: <DollarOutlined/>,
        label: `Jobs`,
        url:'/manage-jobs'
    },
    {
        key: '5',
        icon: <FileTextOutlined />,
        label: `Articles`,
        url:'/manage-articles'
    },
]