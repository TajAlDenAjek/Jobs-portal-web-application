import React from 'react'
import CompanyProfileForm from './CompanyProfileForm'
import { Modal, Button } from 'antd'
// import { useGetProfileQuery } from '../../features/CompanyProfile/CompanyApiSlice'

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
    // const {
    //     data,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetProfileQuery({})

    // if (isSuccess) {
    //     console.log(data)
    // } else if (isError) {
    //     console.log(error)
    // }
    return (
        <>
            {
                isModal
                    ?
                    <CompanyProfileForm id={id} profileData={profileData} isDisabled={true} />
                    :
                    <div className='company-profile-page'>
                        <CompanyProfileForm id={id} profileData={profileData} />
                    </div>
            }
        </>
    )
}

export default CompanyProfile