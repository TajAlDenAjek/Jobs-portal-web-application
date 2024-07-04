import React, { useState } from 'react'
import AdminTable from '../../componenets/adminTable/AdminTable'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Spin, Empty } from 'antd'
import { useGetProfilesQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice';
import JobSeekerProfile from '../jobSeekerProfile/JobSeekerProfile';
import { useDeleteProfileMutation } from '../../features/jobSeekerProfile/jobSeekerApiSlice';
import { Modal, Button, message } from 'antd'

const JobSeekersTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProfile, setCurrentProfile] = useState<any>(null)
    const [deleteRecord, { }] = useDeleteProfileMutation()

    const handleDelete = async (id: any) => {
        try {
            await deleteRecord(id).unwrap()
            message.success('Account Deleted Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery({})
    const columns: TableProps['columns'] = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            filterSearch: true,
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => {

                        setCurrentProfile(record)
                        setIsModalOpen(true)
                    }
                    }>View</a>
                    <a onClick={() => {
                        handleDelete(record._id)
                    }
                    }>Delete</a>
                </Space>
            ),
        },
    ];

    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={columns} data={currentData?.users} isLoading={isLoading} tableTitle={"Job Seekers Admin Table"} />
    } else if (isSuccess) {
        content = <AdminTable columns={columns} data={currentData?.users} tableTitle={"Job Seekers Admin Table"} />
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>
            {content}
            <Modal
                width={600}
                title={"Job Seeker Profile"}
                open={isModalOpen}
                destroyOnClose
                closable={true}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                maskClosable={true}
                footer={
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            {/* <Button onClick={handleUpdate} type="primary">Update</Button> */}
                        </div>
                    </>
                }
            >
                <JobSeekerProfile isModal={true} profileData={currentProfile} id={currentProfile?._id} />
            </Modal>
        </>
    )
}

export default JobSeekersTable