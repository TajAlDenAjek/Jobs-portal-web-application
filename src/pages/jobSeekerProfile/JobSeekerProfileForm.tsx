import React from 'react'
import {
    Form, message, Input, Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd'

import type { FormProps } from 'antd'
import './style.scss'

interface jobSeekerProfileProps {
    isDisabled?: boolean,
    profileData?: any,
    id?: any,
}

type jobSeekerProfileFieldType = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,

    gender?: "male" | "female",
    birthDate?: string,
    country?: string,
    personalImage?: string,
    descriptionOrSummary?: string,
    education?: any,
    workExperience?: any,
    skills?: any,
}


const JobSeekerProfileForm: React.FC<jobSeekerProfileProps> = ({
    isDisabled = false,
    profileData,
    id,
}) => {
    const [form] = Form.useForm();

    const onFinish: FormProps<jobSeekerProfileFieldType>['onFinish'] = async (values) => {
        try {
            message.success('Update Successful')
            // form.resetFields()
            // navigate('/')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    return (
        <div>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                // initialValues={{ remember: true }}
                disabled={isDisabled}
                autoComplete='off'
                onFinish={onFinish}

            >
                <Form.Item<jobSeekerProfileFieldType> name="firstName" label="First Name"
                    rules={[{ required: true, message: 'Please Enter your First name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="lastName" label="Last Name"
                    rules={[{ required: true, message: 'Please Enter your Last name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="email" label="Email"
                    rules={[{ required: true, message: 'Please Enter your email' }]}
                >
                    <Input type='email' />
                </Form.Item>
                <Form.Item<jobSeekerProfileFieldType> name="password" label="Password"
                    rules={[{ required: true, message: 'Please Enter your password' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="Gender" name={"gender"}>
                    <Radio.Group>
                        <Radio value="male"> Male </Radio>
                        <Radio value="female"> Female </Radio>
                    </Radio.Group>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <Button>{"Generate CV"}</Button>
                    <Button type='primary' htmlType='submit' disabled={true}>{false ? "Updating..." : "Update"}</Button>
                    <Button danger type="primary">Delete Profile</Button>
                </div>
            </Form>
        </div>
    )
}

export default JobSeekerProfileForm