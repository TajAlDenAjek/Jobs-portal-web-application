import { apiSlice } from "../../app/api/apiSlice";



export const CompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCompanyProfiles: builder.query({
            query: () => `/auth/companies`,
            providesTags: ['CompanyProfile']
        }),
        getCompanyProfile: builder.query({
            query: (id)=> `/auth/company/${id}`,
            providesTags: ['CompanyProfile']
        }),
        updateCompanyProfile: builder.mutation({
            query: data => {
                return {
                    url: `/auth/company/updateProfile/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['CompanyProfile']
        }),
        deleteCompanyProfile: builder.mutation({
            query: id => {
                return {
                    url: `/auth/company/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['CompanyProfile']
        }),

    })
})


export const {
    useGetCompanyProfilesQuery,
    useGetCompanyProfileQuery,
    useUpdateCompanyProfileMutation,
    useDeleteCompanyProfileMutation
} = CompanyApiSlice;