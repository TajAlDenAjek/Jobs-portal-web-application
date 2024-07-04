import React from 'react'
import type { FormProps, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { useJobSeekerRegisterMutation } from '../../features/auth/authApiSlice'
import { message } from 'antd'
type JobSeekerRegisterFieldType = {
    firstName?: string
    lastName?: string
    email?: string,
    password?: string,
}
const JobSeekerRegisterationForm = () => {
    const [register, { isLoading }] = useJobSeekerRegisterMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish: FormProps<JobSeekerRegisterFieldType>['onFinish'] = async (values) => {
        try {
            const userData = await register({ ...values, permission: "jobSeeker" }).unwrap()
            form.resetFields()
            message.success('Registration Successful')
            navigate('/login')
        } catch (error: any) {
            form.setFields([{
                name: 'email',
                errors: ['email is already in use']
            }])
        }
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
        >
            <Form.Item<JobSeekerRegisterFieldType> name="firstName" label="First Name"
                rules={[{ required: true, message: 'Please Enter your First name' }]}
            >
                <Input type='text' />
            </Form.Item>
            <Form.Item<JobSeekerRegisterFieldType> name="lastName" label="Last Name"
                rules={[{ required: true, message: 'Please Enter your Last name' }]}
            >
                <Input type='text' />
            </Form.Item>
            <Form.Item<JobSeekerRegisterFieldType> name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your email' }]}
            >
                <Input type='email'/>
            </Form.Item>
            <Form.Item<JobSeekerRegisterFieldType> name="password" label="Password"

                rules={[{ required: true, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</Button>
            </Form.Item>
        </Form>
    )
}

export default JobSeekerRegisterationForm