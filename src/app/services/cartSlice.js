import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  tagTypes: ["CartApi"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: (result) =>
        result?.data?.products && Array.isArray(result.data.products)
          ? [
              ...result.data.products.map(({ _id }) => ({
                type: "CartApi",
                id: _id,
              })),
              { type: "CartApi", id: "LIST" },
            ]
          : [{ type: "CartApi", id: "LIST" }],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CartApi", id: "LIST" }],
    }),

    applyCoupon: builder.mutation({
      query: (body) => ({
        url: "/cart/applyCoupon",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "CartApi", id: "LIST" }],
    }),

    addProductToCart: builder.mutation({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "CartApi", id: "LIST" }],
    }),

    updateQuantity: builder.mutation({
      query: ({ id, body }) => ({
        url: `/cart/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        // Create a patch to optimistically update the cache
        const patchResult = dispatch(
          cartApiSlice.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.data.products.find(
              (product) => product._id === id
            );
            if (item) {
              item.count = body.quantity; // Update the quantity in the draft
            }
          })
        );
        try {
          await queryFulfilled; // Wait for the query to be fulfilled
        } catch {
          patchResult.undo(); // Revert the patch if the query fails
        }
      },
      invalidatesTags: [{ type: "CartApi", id: "LIST" }],
    }),

    removeProductFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "CartApi", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useClearCartMutation,
  useApplyCouponMutation,
  useAddProductToCartMutation,
  useUpdateQuantityMutation,
  useRemoveProductFromCartMutation,
} = cartApiSlice;
