import { apiSlice } from "../../app/api/apiSlice";



export const AdminApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => `/admin/mangeUsers`,
            providesTags: ['adminUsers']
        }),
        getCompanies: builder.query({
            query: () => `/admin/mangeCompanies`,
            providesTags: ['adminCompanies']
        }),
        approveCompany: builder.mutation({
            query: data => {
                return {
                    url: `/admin/mangeCompanies/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['adminCompanies']
        }),
        deleteCompany: builder.mutation({
            query: id => {
                return {
                    url: `/admin/mangeCompanies/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['adminCompanies']
        }),
        deleteUser: builder.mutation({
            query: id => {
                return {
                    url: `/admin/mangeUsers/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['adminUsers']
        }),

    })
})


export const {
    useGetUsersQuery,
    useGetCompaniesQuery,
    useApproveCompanyMutation,
    useDeleteCompanyMutation,
    useDeleteUserMutation
} = AdminApiSlice;