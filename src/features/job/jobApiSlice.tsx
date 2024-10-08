import { apiSlice } from "../../app/api/apiSlice";



export const JobApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getJobs: builder.query({
            query: () => `/auth/company/job/jobOfCompany`,
            providesTags: ['Jobs']
        }),
        getUserJobs: builder.query({
            query: () => `/auth/application/addApplication/getjobs/getstatus`,
            providesTags: ['Jobs']
        }),
        getApplicationsOnJob:builder.query({
            query: (id)=> `/auth/company/job/applications/jobApplications/${id}`,
            providesTags: ['Jobs'] 
        }),
        getUserJobsApplications: builder.query({
            query: () => `/auth/application/addApplication/getjobs/getuserapps`,
            providesTags: ['Jobs']
        }),
        getJob: builder.query({
            query: (id)=> `/auth/company/job/job/jobOfCompany/${id}`,
            providesTags: ['Jobs']
        }),
        updateJob: builder.mutation({
            query: data => {
                return {
                    url: `/auth/company/job/job/modifyjob/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Jobs']
        }),
        updateApplicationStatus:builder.mutation({
            query: data => {
                return {
                    url: `/auth/company/job/applications/jobApplications/modify/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Jobs']
        }),
        applyOnAJob: builder.mutation({
            query: data => {
                return {
                    url: `/auth/application/addApplication/${data?.id}`,
                    method: 'POST',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Jobs']
        }),
        createJob: builder.mutation({
            query: data => {
                return {
                    url: `/auth/company/job/createJob`,
                    method: 'POST',
                    body: data,
                    formData: true,
                };
            },
            invalidatesTags: ['Jobs']
        }),
        deleteJOb: builder.mutation({
            query: id => {
                return {
                    url: `/auth/company/job/job/job/company/delete/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Jobs']
        }),
        cancelApplication:builder.mutation({
            query:id=>{
                return{
                    url:`/auth/application/addApplication/getjobanddeleted/${id}`,
                    method:'DELETE',
                }
            },
            invalidatesTags: ['Jobs']
        })
    })
})


export const {
    useGetJobsQuery,
    useGetUserJobsQuery,
    useGetUserJobsApplicationsQuery,
    useApplyOnAJobMutation,
    useGetJobQuery,
    useUpdateJobMutation,
    useCreateJobMutation,
    useDeleteJObMutation,
    useCancelApplicationMutation,
    useGetApplicationsOnJobQuery,
    useUpdateApplicationStatusMutation
} = JobApiSlice;