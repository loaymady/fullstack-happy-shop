import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "wishlist",
  //= queryKey in react-query, for caching
  tagTypes: ["Wishlist"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-happy-shop-backend.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Wishlist
    getWishlist: builder.query({
      query: () => {
        return {
          url: `/wishlist`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Wishlist",
                id,
              })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),

    AddToWishlist: builder.mutation({
      query: (body) => {
        return {
          url: `/wishlist`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),

    removeFromWishlist: builder.mutation({
      query: (id) => {
        return {
          url: `/wishlist/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },

      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApiSlice;
