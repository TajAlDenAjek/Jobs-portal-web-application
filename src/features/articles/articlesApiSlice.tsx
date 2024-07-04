import { apiSlice } from "../../app/api/apiSlice";



export const ArticleApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArticles: builder.query({
            query: () => `/auth/Article/allArticles`,
            providesTags: ['Article']
        }),
        getUserArticles: builder.query({
            query: () => `/auth/Article/userArticles`,
            providesTags: ['Article']
        }),
        getArticle: builder.query({
            query: (id)=> `/auth/Article/${id}`,
            providesTags: ['Article']
        }),
        updateArticle: builder.mutation({
            query: data => {
                return {
                    url: `/auth/modifyArticle/${data?.id}`,
                    method: 'PUT',
                    body: data?.data,
                    formData: true,
                };
            },
            invalidatesTags: ['Article']
        }),
        createArticle: builder.mutation({
            query: data => {
                return {
                    url: `/auth/addArticle/addArticle`,
                    method: 'Article',
                    body: data,
                    formData: true,
                };
            },
            invalidatesTags: ['Article']
        }),
        deleteArticle: builder.mutation({
            query: id => {
                return {
                    url: `/auth/deleteArticle/${id}`,
                    method: 'DELETE',
                };
            },
            invalidatesTags: ['Article']
        }),

    })
})


export const {
    useGetArticlesQuery,
    useGetUserArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation
} = ArticleApiSlice;