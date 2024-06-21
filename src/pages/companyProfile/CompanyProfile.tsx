import React from 'react'
import CompanyProfileForm from './CompanyProfileForm'
import { Modal, Button } from 'antd'
// import { useGetProfileQuery } from '../../features/CompanyProfile/CompanyApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
interface CompanyProfileProps {
    isModal?: boolean
    id?: any,
    profileData?: boolean,
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({
    isModal = false,
    id,
    profileData
}) => {
    const currentId: string = useSelector(selectCurrentId)
    return (
        <>
            {
                isModal
                    ?
                    <CompanyProfileForm id={id ?? currentId} isDisabled={true} />
                    :
                    <div className='company-profile-page'>
                        <CompanyProfileForm id={id ?? currentId} />
                    </div>
            }
        </>
    )
}

export default CompanyProfile