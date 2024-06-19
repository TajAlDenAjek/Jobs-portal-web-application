import React from 'react'
import JobSeekerProfileForm from './JobSeekerProfileForm'
import { Modal, Button } from 'antd'
import { useGetProfileQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice'

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
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfileQuery({})

    if (isSuccess) {
        console.log(data)
    } else if (isError) {
        console.log(error)
    }
    return (
        <>
            {
                isModal
                    ?
                    <JobSeekerProfileForm id={id} profileData={profileData} isDisabled={true} />
                    :
                    <div className='job-seeker-profile-page'>
                        <JobSeekerProfileForm id={id} profileData={profileData} />
                    </div>
            }
        </>
    )
}

export default JobSeekerProfile