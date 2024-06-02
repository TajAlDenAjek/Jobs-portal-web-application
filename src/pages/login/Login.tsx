import React, { useState } from 'react'
import { Flex, Card, Form, Input, Button } from 'antd'
import './style.css'


const Login = () => {
  const [random, setRandom] = useState('')

  return (
    <div className='login-page'>

      <Flex justify='center' align='center' style={{ height: '100vh' }}>
        <Card className='login-card' >
          <h1 className='login-title'>Login Page</h1>
          <Form
            onFinish={(values: any) => {
              console.log(values)
              console.log('hii')
              setRandom('hi')
            }}
          >
            <Form.Item name={"email"} children={

              <>
                Email
                <Input type='email' />
              </>
            } />
            <Form.Item name={"password"} children={

              <>
                Password
                <Input.Password />
              </>
            } />
            <Button type='primary' formMethod='submit'>Sign in</Button>
          </Form>
        </Card>
      </Flex>
    </div>
  )
}

export default Login