import React, { useState } from 'react'
import { message, Card, Modal, Form, Input, Button, Image, Radio } from 'antd'
import { useUpdateJobMutation, useDeleteJObMutation, useApplyOnAJobMutation } from '../../features/job/jobApiSlice'
import FileUploader from '../../componenets/fileUploader/fileUploader'
interface JobProps {
    job: any,
    isJobOwned?: boolean,
    isUserView?: boolean
}

const Job: React.FC<JobProps> = ({
    job,
    isJobOwned,
    isUserView
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateJob, { isLoading }] = useUpdateJobMutation();
    const [deleteJob, { }] = useDeleteJObMutation();
    const [applyOnAJob, { isLoading: isApplying }] = useApplyOnAJobMutation()
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
    const [cvFileName, setCvFileName] = useState('')
    const applyOnJob = async (values) => {
        if (cvFileName === '') {
            message.error('Please upload your CV')
            return
        }
        else {
            try {
                const applicationData = await applyOnAJob({
                    id: job?._id,
                    data: {
                        cvFileName: cvFileName,
                    }
                }).unwrap()
                setIsModalOpen(false)
                message.success('Job update Successful')
            } catch (error: any) {
                message.error('Something went wrong')
            }
        }
    }

    return (
        <>
            <Card
                className='job-card'
                onClick={showModal}
            >

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {
                        isUserView &&
                        <>
                            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                <Image
                                    preview={false}
                                    width={'40px'}
                                    style={{ borderRadius: '50%' }}
                                    src={job?.companyImage ?? '/src/assets/avatar.jfif'}
                                />
                                <p className='job-text'>{job?.companyName}</p>
                            </div>
                        </>
                    }
                    <p className='job-text' >{job?.jobTitle}</p>
                    <p className='job-text' >{job?.yearsOfExperience} years</p>
                    <p className='job-text' >Job Type {job?.workPosition}</p>
                    <p className='job-text' >Salary {job?.salary}</p>
                    <p className='job-text' >{job?.description}</p>
                    {
                        isUserView &&
                        <>
                            {
                                job?.isApplicated
                                    ?
                                    <p className='job-text-applied'>Applied</p>
                                    :
                                    <></>
                            }
                        </>
                    }
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
                                    <Input type='number' />
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
                                    <Input type='number' />
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
                                {
                                    isUserView &&
                                    <>
                                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            <Image
                                                preview={false}
                                                width={'40px'}
                                                style={{ borderRadius: '50%' }}
                                                src={job?.companyImage ?? '/src/assets/avatar.jfif'}
                                            />
                                            <p className='job-text'>{job?.companyName}</p>
                                        </div>
                                    </>
                                }
                                <p className='job-text' >{job?.jobTitle}</p>
                                <p className='job-text' >{job?.yearsOfExperience} years</p>
                                <p className='job-text' >Job Type {job?.workPosition}</p>
                                <p className='job-text' >Salary {job?.salary}</p>
                                <p className='job-text' >{job?.description}</p>
                                {
                                    isUserView &&
                                    <>
                                        {
                                            job?.isApplicated
                                                ?
                                                <p className='job-text-applied'>Applied</p>
                                                :
                                                <Form
                                                    labelCol={{ span: 24 }}
                                                    wrapperCol={{ span: 24 }}
                                                    onFinish={applyOnJob}
                                                    initialValues={job}
                                                >
                                                    <Form.Item style={{ marginTop: '25px' }}  label={'Upload your cv'}>
                                                        <FileUploader setUrl={setCvFileName} url={cvFileName} isPdf={true} />

                                                    </Form.Item>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                                        <Button htmlType='submit' type="primary" disabled={isApplying}>{isApplying ? "Applying..." : "Apply Now"}</Button>
                                                    </div>
                                                </Form>
                                        }
                                    </>
                                }
                            </div>
                        </>
                }
            </Modal >
        </>
    )
}

export default Job