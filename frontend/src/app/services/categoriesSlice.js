import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "categories",
  //= queryKey in react-query, for caching
  tagTypes: ["Categories"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Categories
    getCategoryList: builder.query({
      query: (arg) => {
        return {
          // => {baseURl}/categories
          url: `/categories?limit=${arg.limit}&page=${arg.page}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Categories",
                id,
              })),
              { type: "Categories", id: "LIST" },
            ]
          : [{ type: "Categories", id: "LIST" }],
    }),

    //** GET Category
    getCategory: builder.query({
      query: (arg) => {
        return {
          url: `/categories/${arg.id}`,
        };
      },
    }),

    createCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/categories`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

//useGetCategoryListQuery is a hook that can be used to fetch products
export const {
  useGetCategoryListQuery,
  useCreateCategoryMutation,
  useGetCategoryQuery,
} = categoriesApiSlice;
