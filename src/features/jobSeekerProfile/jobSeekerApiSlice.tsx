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
        // getComments: builder.query({
        //     query: (id) => `/comment/all/${id}`,
        //     providesTags: ['Comments']
        // }),
        getProfile: builder.query({
            query: ()=> `/auth/updateProfile`,
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
    useGetProfileQuery,
    useUpdateProfileMutation,
    // useGetCommentsQuery,
} = jobSeekerApiSlice;