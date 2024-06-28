import React from 'react'
import Job from './Job';
import { Row, Col } from 'antd';

interface JobList {
    jobs: any[];
    isJobOwned?: boolean
}

const JobsLists: React.FC<JobList> = ({
    jobs,
    isJobOwned = false
}) => {
    return (
        <>
            <div className='jobs-container'>
                {
                    jobs.map((job: any) => {
                        return <Job key={job._id} job={job} isJobOwned={isJobOwned} />;
                    })
                }
            </div>
        </>
    )
}

export default JobsLists