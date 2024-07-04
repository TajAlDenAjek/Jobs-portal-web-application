import React from 'react';
import { Space, Table, Tag,Typography } from 'antd';
import type { TableProps } from 'antd';
import './style.scss'

interface AdminTableProps {
    tableTitle?: String
    data?: any
    columns?: any,
    isLoading?: boolean
}
const AdminTable:React.FC<AdminTableProps> = ({
    tableTitle,
    data,
    columns,
    isLoading=false
}) => {

    return (
        <div className="table-container">
            <h3>{tableTitle}</h3>
            <Table columns={columns} dataSource={data} loading={isLoading} />
        </div>
    )
}

export default AdminTable