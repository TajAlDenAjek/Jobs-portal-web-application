import React, { useState } from 'react'
import { message, Card, Modal, Form, Input, Button } from 'antd'
import { useUpdatePostMutation, useDeletePostMutation } from '../../features/post/postApiSlice';

interface JobProps {
    job: any,
    isJobOwned?: boolean,
}

const Job: React.FC<JobProps> = ({
    job,
    isJobOwned
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateJob, { isLoading }] = useUpdatePostMutation();
    const [deleteJob, { }] = useDeletePostMutation();
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

                <p className='job-text'
                >{job?.text}</p>
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
                                    name={'text'}
                                    label={'Job text'}
                                    rules={[{ required: true, message: 'Enter job text at least 30 chars', min: 30, max: 1000 }]}>
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

                            <p className='job-text' >{job?.text}</p>
                        </>
                }
            </Modal>
        </>
    )
}

export default Job