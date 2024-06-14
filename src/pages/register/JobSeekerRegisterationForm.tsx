import React from 'react'
import type { FormProps, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
type JobSeekerRegisterFieldType = {
    firstName?:string
    lastName?:string
    email?: string,
    password?: string,
}
const JobSeekerRegisterationForm = () => {
    const navigate = useNavigate()
    const onFinish: FormProps<JobSeekerRegisterFieldType>['onFinish'] = (values) => {
        console.log('values', values)
    }
    const onFinishFailed: FormProps<JobSeekerRegisterFieldType>['onFinishFailed'] = (error) => {
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
                <Input type='email' />
            </Form.Item>
            <Form.Item<JobSeekerRegisterFieldType> name="password" label="Password"
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

export default JobSeekerRegisterationForm