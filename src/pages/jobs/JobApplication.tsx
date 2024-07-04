import React, { useState, useEffect } from 'react'
import { Input, Card, Image, Tooltip,message } from 'antd'
import { DownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useCancelApplicationMutation } from '../../features/job/jobApiSlice';

interface JobApplicationProps {
    app: any,
    isUserPage?: boolean

}

const JobApplication: React.FC<JobApplicationProps> = ({
    app,
    isUserPage = false

}) => {
    // const [updatePost, { isLoading }] = useUpdatePostMutation();
    const [cancelApplication, { }] = useCancelApplicationMutation();
    const handleCancel = async () => {
        try {
            await cancelApplication(app?._id).unwrap()
            message.success('Application cancelled ')
          } catch (error: any) {
            message.error('Something went wrong')
          }
    }

    return (
        <>
            <Card
                bordered
                className='app-card'
                // onClick={() => {
                //     setIsModalOpen(true)
                // }}
            >
                {
                    isUserPage
                        ?
                        <>
                            <div style={{ display: 'flex', gap: '30px', justifyContent: 'space-between', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <p className='app-text'>Company Name: {app?.companyName}</p>
                                    <p className='app-text'>Job title: {app?.jobTitle}</p>
                                    <p className='app-text'>Application date: {new Date(app?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className={'app-status' + ' ' + app?.applicationStatus} >{app?.applicationStatus}</div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Tooltip title="Download attachment">
                                            <DownloadOutlined style={{ fontSize: '150%', color: 'purple' }} onClick={() => { window.open(app?.cvFileName, '_blank').focus() }} />
                                        </Tooltip>
                                        <Tooltip title="Cancel application">
                                            <CloseOutlined style={{ fontSize: '150%', color: 'red' }} onClick={handleCancel} />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                        </>
                }

            </Card>

        </>
    )
}

export default JobApplication