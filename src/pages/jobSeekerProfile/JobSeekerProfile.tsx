import React from 'react'
import JobSeekerProfileForm from './JobSeekerProfileForm'
import { Modal, Button } from 'antd'

interface JobSeekerProfileProps {
    isModal?: boolean
    id?: any,
    profileData?: boolean,
}

const JobSeekerProfile: React.FC<JobSeekerProfileProps> = ({
    isModal = false,
    id,
    profileData
}) => {
    const [isModalOpen, setIsModalOpen] = React.useState(true)
    return (
        <>
            {
                isModal
                    ? <Modal
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
                        <JobSeekerProfileForm id={id} profileData={profileData} isDisabled={true} />
                    </Modal>
                    : 
                    <div className='job-seeker-profile-page'>
                        <JobSeekerProfileForm id={id} profileData={profileData} />
                    </div>
            }
        </>
    )
}

export default JobSeekerProfile