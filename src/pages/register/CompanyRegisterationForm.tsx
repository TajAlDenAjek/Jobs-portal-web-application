import React from 'react'
import type { FormProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd'


type CompanyRegisterFieldType = {
    companyName?:string
    email?: string,
    password?: string,
}
const CompanyRegisterationForm = () => {
    const navigate = useNavigate()
    const onFinish: FormProps<CompanyRegisterFieldType>['onFinish'] = (values) => {
        console.log('values', values)
    }
    const onFinishFailed: FormProps<CompanyRegisterFieldType>['onFinishFailed'] = (error) => {
        console.log('error', error)
    }
    return (
        <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            onFinish={onFinish}

        >
            <Form.Item<CompanyRegisterFieldType> name="companyName" label="Company Name"
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
                <Button type='primary' htmlType='submit'>Sign up</Button>
            </Form.Item>
        </Form>
    )
}

export default CompanyRegisterationForm

