import React, { useState } from 'react'
import { useGetCompanyProfileQuery, useDeleteCompanyProfileMutation, useUpdateCompanyProfileMutation, useGetCompanyProfilesQuery } from '../../features/companyProfile/companyProfileApiSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import FileUploader from '../../componenets/fileUploader/fileUploader';

import 'antd-phone-input/styles';
import {
    Form, message, Input, Button,
    Select, Spin
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
    PhoneNumber?: string,
    Site?: string,
    Specialization?:string,
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

    const [companyImage, setCompanyImage] = useState(data?.comapny?.companyImage ?? '')

    const onFinish: FormProps<CompanyProfileFieldType>['onFinish'] = async (values) => {
        try {
            const companyData = await update({
                id: id, data: {
                    ...values,
                    personalImage: companyImage,
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
                initialValues={data?.company}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}

            >
                <Form.Item<CompanyProfileFieldType> label="Company Logo">
                    <FileUploader setUrl={setCompanyImage} url={companyImage} />
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
                <Form.Item<CompanyProfileFieldType> name="PhoneNumber" label="Phone Numbe"
                    rules={[{ required: false, message: 'Enter a vaild phone number', min: 10, max: 10 }]}
                >
                    <Input type='text' />
                </Form.Item>

                {
                    !isDisabled &&
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                        <Button type='primary' htmlType='submit' disabled={false}>{false ? "Updating..." : "Update"}</Button>
                        <Button danger type="primary">Delete Account</Button>
                    </div>
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