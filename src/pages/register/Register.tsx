import React, { useState } from 'react'
import type { FormProps ,TabsProps} from 'antd'
import { useNavigate } from 'react-router-dom'
import { Flex,Tabs, Card, Form, Input, Button, Checkbox } from 'antd'
import './style.css'

type LoginFieldType = {
    email?: string,
    password?: string,
    remember?: string
}
const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Job Seeker',
        children: 'Content of Tab Pane 1',
    },
    {
        key: '2',
        label: 'Company',
        children: 'Content of Tab Pane 2',
    },
];

const Register = () => {
    const navigate = useNavigate()
    const onFinish: FormProps<LoginFieldType>['onFinish'] = (values) => {
        console.log('values', values)
    }
    const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (error) => {
        console.log('error', error)
    }
    return (
        <div className='register-page'>
            <Flex justify='center' align='center' style={{ height: '100vh', width: '100vw' }}>
                <Card className='register-card' >
                    <h1 className='register-title'>Register Page</h1>
                    <Tabs defaultActiveKey="1" items={items}  />
                    <Form
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                        onFinish={onFinish}

                    >
                        <Form.Item<LoginFieldType> name="email" label="Email"
                            rules={[{ required: true, message: 'Please Enter your email' }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                        <Form.Item<LoginFieldType> name="password" label="Password"
                            rules={[{ required: true, message: 'Please Enter your password' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item<LoginFieldType> name="remember" valuePropName='checked' wrapperCol={{ offset: 0, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item<LoginFieldType> valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type='primary' htmlType='submit'>Sign in</Button>
                        </Form.Item>
                    </Form>
                    <h3 className='hover-text-navigator' onClick={() => { navigate('/login') }}>Already have an account Sign in now !</h3>
                </Card>
            </Flex>
        </div>
    )
}

export default Register