import React, { useState } from 'react'
import type { FormProps } from 'antd'
import { Flex, Card, Form, Input, Button, Checkbox } from 'antd'
import './style.css'

type LoginFieldType = {
  email?: string,
  password?: string,
  remember?: string
}


const Login = () => {
  
  const onFinish: FormProps<LoginFieldType>['onFinish'] = (values) => {
    console.log('values', values)
  }
  const onFinishFailed: FormProps<LoginFieldType>['onFinishFailed'] = (error) => {
    console.log('error', error)
  }
  return (
    <div className='login-page'>
      <Flex justify='center' align='center' style={{ height: '100vh' ,width:'100vw'}}>
        <Card className='login-card' >
          <h1 className='login-title'>Login Page</h1>
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
        </Card>
      </Flex>
    </div>
  )
}

export default Login