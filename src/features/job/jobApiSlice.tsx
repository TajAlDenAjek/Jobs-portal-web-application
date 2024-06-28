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
                    url: `/auth/company/job/deleteJob/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Jobs']
        }),

    })
})


export const {
    useGetJobsQuery,
    useGetUserJobsQuery,
    useApplyOnAJobMutation,
    useGetJobQuery,
    useUpdateJobMutation,
    useCreateJobMutation,
    useDeleteJObMutation
} = JobApiSlice;