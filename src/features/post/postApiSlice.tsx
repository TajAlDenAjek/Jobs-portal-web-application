import { apiSlice } from "../../app/api/apiSlice";



export const PostApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => `/auth/post/allposts`,
            providesTags: ['Post']
        }),
        getUserPosts: builder.query({
            query: () => `/auth/post/userPosts`,
            providesTags: ['Post']
        }),
        getPost: builder.query({
            query: (id)=> `/auth/post/${id}`,
            providesTags: ['Post']
        }),
        updatePost: builder.mutation({
            query: data => {
                return {
                    url: `/auth/modifypost/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Post']
        }),
        createPost: builder.mutation({
            query: data => {
                return {
                    url: `/auth/addpost/addpost`,
                    method: 'POST',
                    body: data,
                    formData: true,
                };
            },
            invalidatesTags: ['Post']
        }),
        deletePost: builder.mutation({
            query: id => {
                return {
                    url: `/auth/deletePost/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Post']
        }),

    })
})


export const {
    useGetPostsQuery,
    useGetUserPostsQuery,
    useGetPostQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = PostApiSlice;