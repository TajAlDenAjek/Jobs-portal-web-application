import React, { useState, useEffect } from 'react'
import { Input, Card, Image } from 'antd'
import CompanyProfile from '../companyProfile/CompanyProfile'
import { Modal, Button } from 'antd'
interface CompanyProps {
    profile: any
}
const Company: React.FC<CompanyProps> = ({
    profile
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Card
                bordered
                className='company-card'
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
                <p className='company-text'>{profile?.name}</p>
            </Card>
            <Modal
                width={600}
                title={"Company Profile"}
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
                <CompanyProfile isModal={true} id={profile?._id}/>
            </Modal>
        </>
    )
}

export default Company