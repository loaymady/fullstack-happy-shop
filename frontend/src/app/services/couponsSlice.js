import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "coupons",
  //= queryKey in react-query, for caching
  tagTypes: ["Coupons"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Coupons
    getCouponList: builder.query({
      query: () => {
        return {
          url: `/coupons`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Coupons",
                id,
              })),
              { type: "Coupons", id: "LIST" },
            ]
          : [{ type: "Coupons", id: "LIST" }],
    }),

    //** GET Coupon
    getCoupon: builder.query({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
    }),

    createCoupon: builder.mutation({
      query: (body) => {
        return {
          url: `/coupons`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Coupons", id: "LIST" }],
    }),

    deleteCoupon: builder.mutation({
      query: (id) => {
        return {
          url: `/coupons/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Coupons", id: "LIST" }],
    }),

    updateCoupon: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/coupons/${id}`,
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
          couponsApiSlice.util.updateQueryData("getCouponList", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Coupons", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetCouponListQuery,
  useGetCouponQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
} = couponsApiSlice;
