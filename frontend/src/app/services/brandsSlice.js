import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "brands",
  //= queryKey in react-query, for caching
  tagTypes: ["Brands"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Brands
    getBrandList: builder.query({
      query: (arg) => {
        return {
          url: `/brands?limit=${arg.limit}&page=${arg.page}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Brands",
                id,
              })),
              { type: "Brands", id: "LIST" },
            ]
          : [{ type: "Brands", id: "LIST" }],
    }),
    //** GET Brand
    getBrand: builder.query({
      query: (arg) => {
        return {
          url: `/brands/${arg.id}`,
        };
      },
    }),

    createBrand: builder.mutation({
      query: (body) => {
        return {
          url: `/brands`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Brands", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetBrandListQuery,
  useCreateBrandMutation,
  useGetBrandQuery,
} = brandsApiSlice;
