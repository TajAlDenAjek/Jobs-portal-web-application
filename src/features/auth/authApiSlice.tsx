import { apiSlice } from "../../app/api/apiSlice";


// logic on auth route (register,login,logout)

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        jobSeekerRegister: builder.mutation({
            query: data => ({
                url: '/auth/signup',
                method: 'POST',
                body: { ...data },
            })
        }),
        companyRegister: builder.mutation({
            query: data => ({
                url: '/auth/addCompany',
                method: 'POST',
                body: { ...data },
            })
        }),
        login: builder.mutation({
            query: data => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...data },
            }),
            invalidatesTags: ['auth','JobSeekerProfile','CompanyProfile','Post','Jobs','Article','adminUsers','adminCompanies']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'GET',
            })
        })
    })
})


export const {
    useJobSeekerRegisterMutation,
    useCompanyRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApiSlice