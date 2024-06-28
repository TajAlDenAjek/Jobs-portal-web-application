import React, { useState } from 'react'
import JobsList from './JobsList'
import { message, Modal, Form, Input, Button } from 'antd'
import { useCreatePostMutation, useGetUserPostsQuery } from '../../features/post/postApiSlice';
import { Empty, Spin } from 'antd';

const CurrentCompanyJobs = () => {
    const { data: jobs, isLoading: isJobsLoading, isSuccess } = useGetUserPostsQuery({})
    let content = <Empty />
    if (isJobsLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            <JobsList jobs={jobs?.jobs} isJobOwned={true} />
        )
        if (!jobs?.jobs || jobs?.jobs?.length === 0) {
            content = <Empty />
        }
    }
    const [createJob, { isLoading }] = useCreatePostMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };



    const onFinish = async (values) => {
        try {
            const jobData = await createJob({
                ...values,
            }).unwrap()
            setIsModalOpen(false)
            message.success('Job Created ')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
                <div>
                    <Button onClick={showModal}> Create new Job </Button>
                </div>
                {content}
            </div>
            <Modal
                width={600}
                title={"Create Job"}
                open={isModalOpen}
                destroyOnClose
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                closable={true}
                maskClosable={true}
                okType='primary'
                footer={
                    <>
                    </>
                }
            >
                <>
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                    >
                        <Form.Item style={{ marginTop: '25px' }}
                            name={'text'}
                            label={'Job text'}
                            rules={[{ required: true, message: 'Enter Job text at least 30 chars', min: 30, max: 1000 }]}>
                            <Input.TextArea rows={3} />
                        </Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <Button htmlType='submit' type="primary" disabled={isLoading}>{isLoading ? "Creating..." : "Create"}</Button>
                        </div>
                    </Form>
                </>
            </Modal >
        </>
    )
}

export default CurrentCompanyJobs