import React, { useState } from 'react'
import JobsList from './JobsList'
import { message, Modal, Form, Input, Button } from 'antd'
import { useCreateJobMutation, useGetJobsQuery } from '../../features/job/jobApiSlice';

import { Empty, Spin, Radio } from 'antd';

const CurrentCompanyJobs = () => {
    const { data: jobs, isLoading: isJobsLoading, isSuccess } = useGetJobsQuery({})
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
    const [createJob, { isLoading }] = useCreateJobMutation();

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
                            name={'jobTitle'}
                            label={'Job Title'}
                            rules={[{ required: true, message: 'Job title is required' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={'yearsOfExperience'}
                            label={'Years Of Experince'}
                            rules={[{ required: true, message: 'Years of Experince is required' }]}>
                            <Input  type='number'/>
                        </Form.Item>
                        <Form.Item label="Work Type" name={"workPosition"}>
                            <Radio.Group defaultValue={'Full-time'}>
                                <Radio value="Full-time"> Full Time </Radio>
                                <Radio value="Part-time"> Part Time </Radio>
                                <Radio value="Contract"> Contract </Radio>
                                <Radio value="Internship"> Internship </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name={'salary'}
                            label={'Salary'}
                            rules={[{ required: true, message: 'Salary is required' }]}>
                            <Input type='number'/>
                        </Form.Item>
                        <Form.Item style={{ marginTop: '25px' }}
                            name={'description'}
                            label={'Job Description'}
                            rules={[{ required: true, message: 'Job Description is required' }]}>
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