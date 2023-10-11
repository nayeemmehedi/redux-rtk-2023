import { apiSlice } from "./apiSlice";

export const ExtendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "product",
      providesTags: ["Post"],
    }),

    addNewPost: builder.mutation({
      query: (initialPost) => ({
        url: "/product",
        method: "POST",
        body: initialPost,
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),


    updatePost: builder.mutation({
        // note: an optional `queryFn` may be used in place of `query`
        query: ({ id, ...patch }) => ({
          url: `product/${id}`,
          method: 'PATCH',
          body: patch,
        }),
        invalidatesTags: ["Post"],
    })
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  
} = ExtendedApiSlice;
