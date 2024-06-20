import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import Company from './Company'
import './styles.scss'
const FindCompanies = () => {
    
    // fetch user profiles
    let profiles: any = [1, 2, 3, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2]


    return (
        <div className='find-companies-page'>
            <Input.Search />
            {
                profiles.map((profile: any, index: any) => {
                    return <Company key={index} profile={profile} />
                })
            }
        </div>
    )
}

export default FindCompanies