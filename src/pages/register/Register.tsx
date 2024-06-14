import type { TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Flex, Tabs, Card } from 'antd'
import './style.scss'
import JobSeekerRegisterationForm from './JobSeekerRegisterationForm'
import CompanyRegisterationForm from './CompanyRegisterationForm'

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Job Seeker',
        children: <JobSeekerRegisterationForm/>,
    },
    {
        key: '2',
        label: 'Company',
        children:<CompanyRegisterationForm/>,
    },
];

const Register = () => {
    const navigate = useNavigate()

    return (
        <div className='register-page'>
            <Flex justify='center' align='center' style={{ height: '100vh', width: '100vw' }}>
                <Card className='register-card' >
                    <h1 className='register-title'>Register Page</h1>
                    <Tabs defaultActiveKey="1" items={items} />

                    <h3 className='hover-text-navigator' onClick={() => { navigate('/login') }}>Already have an account Sign in now !</h3>
                </Card>
            </Flex>
        </div>
    )
}

export default Register