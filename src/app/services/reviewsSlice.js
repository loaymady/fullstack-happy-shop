import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "reviews",
  //= queryKey in react-query, for caching
  tagTypes: ["Reviews"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Reviews
    getReviewList: builder.query({
      query: (arg) => {
        return {
          url: `/reviews?limit=${arg.limit}&page=${arg.page}&product=${arg.productId}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Reviews",
                id,
              })),
              { type: "Reviews", id: "LIST" },
            ]
          : [{ type: "Reviews", id: "LIST" }],
    }),

    createReview: builder.mutation({
      query: (body) => {
        return {
          url: `/reviews`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/reviews/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },

      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),

    updateReview: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/reviews/${id}`,
          method: "PUT",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      //for caching updates
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          reviewsApiSlice.util.updateQueryData("getReviewList", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Reviews", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetReviewListQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewsApiSlice;
