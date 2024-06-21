import React from 'react'
import JobSeekerProfileForm from './JobSeekerProfileForm'
import { Modal, Button } from 'antd'
import { useGetProfileQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice'
import { useSelector } from 'react-redux'
import { selectCurrentId } from '../../features/auth/authSlice'
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
    const currentId: string = useSelector(selectCurrentId)
    return (
        <>
            {
                isModal
                    ?
                    <JobSeekerProfileForm id={id ?? currentId} isDisabled={true} />
                    :
                    <div className='job-seeker-profile-page'>
                        <JobSeekerProfileForm id={id ?? currentId} />
                    </div>
            }
        </>
    )
}

export default JobSeekerProfile