import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import Candidate from './Candidate'
import './styles.scss'
const FindCandidates = () => {

    // fetch user profiles
    let profiles: any = [1, 2, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]


    return (
        <div className='find-candidates-page'>
            <Input.Search />
            {
                profiles.map((profile: any, index: any) => {
                    return <Candidate key={index} profile={profile} />
                })
            }
        </div>
    )
}

export default FindCandidates