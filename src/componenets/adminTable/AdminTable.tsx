import React from 'react';
import { Space, Table, Tag,Typography } from 'antd';
import type { TableProps } from 'antd';


interface AdminTableProps {
    tableTitle?: String
    data?: any
    columns?: any
}
const AdminTable:React.FC<AdminTableProps> = ({
    tableTitle,
    data,
    columns
}) => {

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default AdminTable