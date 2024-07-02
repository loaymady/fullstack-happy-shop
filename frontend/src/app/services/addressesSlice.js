import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressesApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "addresses",
  //= queryKey in react-query, for caching
  tagTypes: ["Addresses"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Addresses
    getAddressList: builder.query({
      query: () => {
        return {
          url: `/addresses`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Addresses",
                id,
              })),
              { type: "Addresses", id: "LIST" },
            ]
          : [{ type: "Addresses", id: "LIST" }],
    }),

    //** GET Coupon
    getAddress: builder.query({
      query: (id) => {
        return {
          url: `/Addresses/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),

    createAddress: builder.mutation({
      query: (body) => {
        return {
          url: `/addresses`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),

    deleteAddress: builder.mutation({
      query: (id) => {
        return {
          url: `/addresses/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),

    updateAddress: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/addresses/${id}`,
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
          addressesApiSlice.util.updateQueryData(
            "getAddressList",
            id,
            (draft) => {
              Object.assign(draft, patch);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetAddressListQuery,
  useGetAddressQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} = addressesApiSlice;
