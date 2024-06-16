import React from 'react'
import type { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { message, Form, Input, Button } from 'antd'
import { useCompanyRegisterMutation } from '../../features/auth/authApiSlice'
type CompanyRegisterFieldType = {
    name?: string
    email?: string,
    password?: string,
}
const CompanyRegisterationForm = () => {
    const [register, { isLoading }] = useCompanyRegisterMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish: FormProps<CompanyRegisterFieldType>['onFinish'] = async (values) => {
        try {
            const companyData = await register({ ...values, permission: "company" }).unwrap()
            form.resetFields()
            message.success('Registration Successfull')
            navigate('/login')
        } catch (error: any) {
            form.setFields([{
                name: 'email',
                errors: [error?.data?.error?.email]
            }])
        }
    }
    return (
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
            form={form}
        >
            <Form.Item<CompanyRegisterFieldType> name="name" label="Company Name"
                rules={[{ required: true, message: 'Please Enter your Company name' }]}
            >
                <Input type='text' />
            </Form.Item>
            <Form.Item<CompanyRegisterFieldType> name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your email' }]}
            >
                <Input type='email' />
            </Form.Item>
            <Form.Item<CompanyRegisterFieldType> name="password" label="Password"
                rules={[{ required: true, message: 'Please Enter your password' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</Button>
            </Form.Item>
        </Form>
    )
}

export default CompanyRegisterationForm

