import React, { useState } from 'react'
import { message, Card, Modal, Form, Input, Button, Radio } from 'antd'
import { useUpdateJobMutation, useDeleteJObMutation } from '../../features/job/jobApiSlice'

interface JobProps {
    job: any,
    isJobOwned?: boolean,
}

const Job: React.FC<JobProps> = ({
    job,
    isJobOwned
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [deleteJob, { }] = useDeleteJObMutation();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleUpdate = () => {
        setIsModalOpen(false);
    };
    const handleDelete = async () => {
        try {
            await deleteJob(job?._id).unwrap()
            message.success('Job Deleted ')
            setIsModalOpen(false);
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }

    const onFinish = async (values) => {
        try {
            const jobData = await updateJob({
                id: job?._id,
                data: {
                    ...values,
                }
            }).unwrap()
            setIsModalOpen(false)
            message.success('Job update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }

    return (
        <>
            <Card
                className='job-card'
                onClick={showModal}
            >

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <p className='job-text' >{job?.jobTitle}</p>
                    <p className='job-text' >{job?.yearsOfExperience} years</p>
                    <p className='job-text' >Job Type {job?.workPosition}</p>
                    <p className='job-text' >Salary {job?.salary}</p>
                    <p className='job-text' >{job?.description}</p>
                </div>
            </Card>
            <Modal
                width={600}
                title={isJobOwned ? "Edit job" : "Job info"}
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
                {
                    isJobOwned
                        ?
                        <>
                            <Form
                                labelCol={{ span: 24 }}
                                wrapperCol={{ span: 24 }}
                                onFinish={onFinish}
                                initialValues={job}
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
                                    <Input type='number'/>
                                </Form.Item>
                                <Form.Item label="Work Type" name={"workPosition"}>
                                    <Radio.Group>
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
                                    <Button htmlType='submit' type="primary" disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
                                    <Button onClick={handleDelete} danger type="primary"> Delete</Button>
                                </div>
                            </Form>
                        </>
                        :
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <p className='job-text' >{job?.jobTitle}</p>
                                <p className='job-text' >{job?.yearsOfExperience} years</p>
                                <p className='job-text' >Job Type {job?.workPosition}</p>
                                <p className='job-text' >Salary {job?.salary}</p>
                                <p className='job-text' >{job?.description}</p>
                            </div>
                        </>
                }
            </Modal>
        </>
    )
}

export default Job