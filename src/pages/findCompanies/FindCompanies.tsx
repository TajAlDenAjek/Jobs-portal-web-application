import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import Company from './Company'
import './styles.scss'
import { Spin, Empty } from 'antd'

import { useGetCompanyProfilesQuery } from '../../features/companyProfile/companyProfileApiSlice'
const FindCompanies = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCompanyProfilesQuery({})

    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            data?.companies?.map((profile: any, index: any) => {
                return <Company key={index} profile={profile} />
            })
        )
        if (data?.companies?.length === 0) {
            content = <Empty />
        }
    } else if (isError) {
        content = <>{error}</>
    }

    return (
        <div className='find-companies-page'>
            <Input.Search />
            {content}
        </div>
    )
}

export default FindCompanies