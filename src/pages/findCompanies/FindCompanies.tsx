import React, { useState, useEffect } from 'react'
import { Input, Spin, Empty } from 'antd'
import Company from './Company'
import './styles.scss'

import { useGetCompanyProfilesQuery } from '../../features/companyProfile/companyProfileApiSlice'

const FindCompanies = () => {
    const [searchValue, setSearchValue] = useState('')
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetCompanyProfilesQuery({})

    const [filteredCompanies, setFilteredCompanies] = useState(currentData?.companies)

    useEffect(() => {
        if (searchValue) {
            setFilteredCompanies(currentData?.companies?.filter((company: any) => {
                return company.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    company?.Specialization?.toLowerCase().includes(searchValue.toLowerCase())
            }))
        } else {
            setFilteredCompanies(currentData?.companies)
        }
    }, [searchValue])

    let content = <Empty />
    if (isLoading) {
        content = <Spin />
    } else if (isSuccess) {
        content = (
            filteredCompanies?.map((profile: any, index: any) => {
                return <Company key={index} profile={profile} />
            })
        )
        if (!filteredCompanies || filteredCompanies.length === 0) {
            content = <Empty />
        }
    } else if (isError) {
        content = <>{error}</>
    }

    return (
        <div className='find-companies-page'>
            <Input.Search
                placeholder="Search companies by name or specialization"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            {content}
        </div>
    )
}

export default FindCompanies
