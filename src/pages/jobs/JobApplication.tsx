import React, { useState, useEffect } from 'react'
import { Input, Card, Image } from 'antd'

interface JobApplicationProps {
    app: any,
    isUserPage?:boolean

}

const JobApplication: React.FC<JobApplicationProps> = ({
    app,
    isUserPage = false

}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Card
                bordered
                className='app-card'
                onClick={() => {
                    setIsModalOpen(true)
                }}
            >
                tempooo
                {/* <Image
                    preview={false}
                    width={'40px'}
                    style={{ borderRadius: '50%' }}
                    src={profile?.companyImage ?? '/src/assets/avatar.jfif'}
                />
                <p className='job-application-text'>{profile?.name}</p> */}
            </Card>

        </>
    )
}

export default JobApplication