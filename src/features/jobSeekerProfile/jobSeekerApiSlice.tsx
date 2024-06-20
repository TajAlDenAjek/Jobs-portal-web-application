import { apiSlice } from "../../app/api/apiSlice";

export type JobSeekerProfile = {
    password?: string,
    email: string,
    firstName: string | undefined,
    lastName: string | undefined,
    gender: "male" | "female" | undefined
    birthday: string | undefined,
    country: string | undefined,
}


export const jobSeekerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfiles: builder.query({
            query: () => `/auth`,
            providesTags: ['JobSeekerProfile']
        }),
        getProfile: builder.query({
            query: (id)=> `/auth/${id}`,
            providesTags: ['JobSeekerProfile']
        }),
        updateProfile: builder.mutation({
            query: data => {
                // const bodyFormData = new FormData();
                // bodyFormData.append('image', data.image);
                // bodyFormData.append('data', data.data);
                return {
                    url: `/auth/updateProfile`,
                    method: 'PATCH',
                    // body: bodyFormData,
                    formData: true,
                };
            }
        }),
    })
})


export const {
    useGetProfilesQuery,
    useGetProfileQuery,
    useUpdateProfileMutation,
} = jobSeekerApiSlice;