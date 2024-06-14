import React from 'react'
import { Layout, Menu, theme } from 'antd'
const { Sider } = Layout
import { useSelector } from "react-redux"
import { Permissions } from '../../features/auth/authSlice';
import { selectCurrentPermission } from '../../features/auth/authSlice';
import { adminPages, companyPages, jobSeekerPages } from './SideBarConstants';
import { useNavigate } from 'react-router';
const Sidebar = () => {
    const navigate = useNavigate()
    const permission: Permissions | null = useSelector(selectCurrentPermission)
    const items = permission === 'admin' ? adminPages : permission === "company" ? companyPages : jobSeekerPages
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Sider

            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu
                // selectedKeys={}
                theme="dark"
                mode="inline"
                items={items}
                onClick={(e) => {
                    navigate(items[Number(e.key) - 1]?.url)
                }}
            />
        </Sider>
    )
}

export default Sidebar