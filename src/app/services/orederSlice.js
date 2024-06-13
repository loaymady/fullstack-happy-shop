import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  tagTypes: ["OrderApi"],
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
    getAllOrders: builder.query({
      query: () => ({
        url: "/orders",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "OrderApi",
                id,
              })),
              { type: "OrderApi", id: "LIST" },
            ]
          : [{ type: "OrderApi", id: "LIST" }],
    }),

    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),

    orderPaid: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/pay`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "OrderApi", id: "LIST" }],
    }),

    orderdeliver: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/deliver`,
        method: "PUT",
      }),
      invalidatesTags: [{ type: "OrderApi", id: "LIST" }],
    }),

    createCashOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "OrderApi", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useOrderPaidMutation,
  useOrderdeliverMutation,
  useCreateCashOrderMutation,
} = orderApiSlice;
