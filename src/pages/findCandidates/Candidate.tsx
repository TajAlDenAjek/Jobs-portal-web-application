import React, { useState, useEffect } from 'react'
import { Input, Card, Image } from 'antd'
import JobSeekerProfile from '../jobSeekerProfile/JobSeekerProfile'
import { Modal, Button } from 'antd'
interface CandidateProps {
    profile: any
}
const Candidate: React.FC<CandidateProps> = ({
    profile
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Card
                bordered
                className='candidate-card'
                onClick={() => {
                    setIsModalOpen(true)
                }}
            >
                <Image
                    preview={false}
                    width={'40px'}
                    style={{ borderRadius: '50%' }}
                    src={profile?.personalImage ?? '/src/assets/avatar.jfif'}
                />
                <p className='candidate-text'>{profile?.firstName+' '+profile?.lastName}</p>
            </Card>
            <Modal
                width={600}
                title={"Job Seeker Profile"}
                open={isModalOpen}
                destroyOnClose
                closable={true}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => setIsModalOpen(false)}
                maskClosable={true}
                footer={
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            {/* <Button onClick={handleUpdate} type="primary">Update</Button> */}
                        </div>
                    </>
                }
            >
                <JobSeekerProfile isModal={true} profileData={profile} id={profile?._id}/>
            </Modal>
        </>
    )
}

export default Candidate