import React, { useState, useEffect } from 'react'
import { useGetProfilesQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice'
import { Input } from 'antd'
import {Spin,Empty} from 'antd'

import Candidate from './Candidate'
import './styles.scss'
const FindCandidates = () => {
    const [searchValue, setSearchValue] = useState('')
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery({})
    const [filteredCandidates,setFilteredCandidates]=useState(currentData?.users)
    useEffect(() => {
        if (searchValue) {
            setFilteredCandidates(currentData?.users?.filter((user: any) => {
                return (user?.firstName?.toLowerCase()+' '+user?.lastName?.toLowerCase()).includes(searchValue.toLowerCase()) ||
                user?.Specialization?.toLowerCase().includes(searchValue.toLowerCase())
            }))
        } else {
            setFilteredCandidates(currentData?.users)
        }
    }, [searchValue])


    let content = <Empty/>
    if (isLoading) {
        content=<Spin/>
    } else if (isSuccess) {
        content = (
            filteredCandidates?.map((profile: any, index: any) => {
                return <Candidate key={index} profile={profile} />
            })
        )
        if (!filteredCandidates || filteredCandidates.length === 0) {
            content = <Empty />
        }
    } else if (isError) {
        content=<>{error}</>
    }


    return (
        <div className='find-candidates-page'>
            <Input.Search
                placeholder="Search candidates by name or specialization"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {content}
        </div>
    )
}

export default FindCandidates