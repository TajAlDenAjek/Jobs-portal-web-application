import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../../features/auth/authSlice'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY 


type RefreshResponse = {
    data: any,
    user: {
        id?: number,
        username?: string,
    } | any
} | any

// configure for cookies and tokens
const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_SIDE,
    // credentials: 'include',
    // credentials: "same-origin", 
    prepareHeaders: (headers, { getState}: any) => {
        headers.set('Content-Type', 'application/json');
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }  
})

// custom query function to (access-refresh) logic
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    // try first request
    let result = await baseQuery(args, api, extraOptions)
    // your token maybe expired 
    if (result?.error?.status === 401) {
        api.dispatch(logOut())
        // window.location.replace('/login')
    } else if (result?.error?.status === 500){
        if(result?.error?.data?.message?.message==='jwt expired'){
            api.dispatch(logOut())
        }
    }
    return result
}

// Api Slice 
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['auth','JobSeekerProfile','CompanyProfile','Post'],
    endpoints: () => ({}),
})


