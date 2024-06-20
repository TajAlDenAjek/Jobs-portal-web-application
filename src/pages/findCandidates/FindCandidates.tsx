import React, { useState, useEffect } from 'react'
import { useGetProfilesQuery } from '../../features/jobSeekerProfile/jobSeekerApiSlice'
import { Input } from 'antd'
import {Spin,Empty} from 'antd'

import Candidate from './Candidate'
import './styles.scss'
const FindCandidates = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProfilesQuery({})

    let content = <Empty/>
    if (isLoading) {
        content=<Spin/>
    } else if (isSuccess) {
        content = (
            data?.users?.map((profile: any, index: any) => {
                return <Candidate key={index} profile={profile} />
            })
        )
        if (data?.users?.length === 0) {
            content = <Empty/>
        }
    } else if (isError) {
        content=<>{error}</>
    }


    return (
        <div className='find-candidates-page'>
            <Input.Search />
            {content}
        </div>
    )
}

export default FindCandidates