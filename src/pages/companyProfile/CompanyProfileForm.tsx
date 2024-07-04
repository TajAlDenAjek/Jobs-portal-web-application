import React, { useState, useEffect } from 'react'
import { useGetCompanyProfileQuery, useDeleteCompanyProfileMutation, useUpdateCompanyProfileMutation, useGetCompanyProfilesQuery } from '../../features/companyProfile/companyProfileApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import FileUploader from '../../componenets/fileUploader/fileUploader';
import { CompanyObjectToForm } from '../../componenets/helpers';
import 'antd-phone-input/styles';
import {
    Form, message, Input, Button,
    Select, Spin, Typography, Image
} from 'antd'
const { Option } = Select;
import type { FormProps } from 'antd'
import './style.scss'



interface CompanyProfileProps {
    isDisabled?: boolean,
    profileData?: any,
    id?: any,
}

type CompanyProfileFieldType = {
    email?: string,
    password?: string,
    name?: string,
    phoneNumber?: string,
    Site?: string,
    Specialization?: string,
    About?: string,
    CompanyImage?: string,
}


const CompanyProfileForm: React.FC<CompanyProfileProps> = ({
    isDisabled = false,
    profileData,
    id,
}) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {
        data,
        currentData,
        isSuccess
    } = useGetCompanyProfileQuery(id)
    const [update, { isLoading }] = useUpdateCompanyProfileMutation()
    const [deleteProfile, { }] = useDeleteCompanyProfileMutation()
    const handleDeleteProfile = async () => {
        try {
            await deleteProfile(id).unwrap()
            dispatch(logOut())
            navigate('/login')
            message.success('Account Deleted Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }

    const [companyImage, setCompanyImage] = useState(currentData?.comapny?.companyImage ?? '')
    useEffect(() => {
        setCompanyImage(currentData?.comapny?.companyImage ?? '')
    }, [currentData?.company?.companyImage])
    const onFinish: FormProps<CompanyProfileFieldType>['onFinish'] = async (values) => {
        try {
            const companyData = await update({
                id: id, data: {
                    ...values,
                    companyImage: companyImage,
                }
            }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }


    let content = <Spin />
    if (isSuccess) {
        content =
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValues={CompanyObjectToForm(data?.company)}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}

            >
                {
                    isDisabled && <>
                        <Image
                            src={data?.company?.companyImage ?? '/src/assets/avatar.jfif'}
                        />

                        <Form.Item<CompanyProfileFieldType> label="Company Name">
                            <Typography.Text>{data?.company?.name || '---'}</Typography.Text>
                        </Form.Item>

                        <Form.Item<CompanyProfileFieldType> label="Email">
                            <Typography.Text>{data?.company?.email || '---'}</Typography.Text>
                        </Form.Item>

                        <Form.Item<CompanyProfileFieldType> label="Specialization">
                            <Typography.Text>{data?.company?.specialization || '---'}</Typography.Text>
                        </Form.Item>

                        <Form.Item<CompanyProfileFieldType> label="Site">
                            <Typography.Text>{data?.company?.site || '---'}</Typography.Text>
                        </Form.Item>

                        <Form.Item<CompanyProfileFieldType> label="About">
                            <Typography.Text>{data?.company?.about || '---'}</Typography.Text>
                        </Form.Item>

                        <Form.Item<CompanyProfileFieldType> label="Phone Number">
                            <Typography.Text>{data?.company?.phoneNumber || '---'}</Typography.Text>
                        </Form.Item>
                    </>
                }
                {
                    !isDisabled &&
                    <>
                        <Form.Item<CompanyProfileFieldType> label="Company Logo">
                            <FileUploader setUrl={setCompanyImage} url={data?.company?.companyImage} />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="name" label="Company Name"
                            rules={[{ required: true, message: 'Please Enter your comapny name with at least 3 chars', min: 3 }]}
                        >
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="email" label="Email"
                            rules={[{ required: true, message: 'Please Enter your email' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="password" label="Password"
                            rules={[{ required: true, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="Specialization" label="Specialization"
                        >
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="Site" label="Site"
                        >
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType>
                            name="About"
                            label="About"
                        >
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item<CompanyProfileFieldType> name="phoneNumber" label="Phone Number"
                            rules={[{ required: false, message: 'Enter a vaild phone number', min: 10, max: 10 }]}
                        >
                            <Input type='text' />
                        </Form.Item>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Updating..." : "Update"}</Button>
                            <Button danger type="primary" onClick={handleDeleteProfile}>Delete Account</Button>
                        </div>
                    </>
                }
            </Form>
    }
    return (
        <div>
            {content}
        </div>
    )
}

export default CompanyProfileForm