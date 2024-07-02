import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategoriesApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "subcategories",
  //= queryKey in react-query, for caching
  tagTypes: ["SubCategory"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET SubCategories
    getSubCategoryListForCateg: builder.query({
      query: (arg) => {
        return {
          url: `/categories/${arg.id}/subcategories`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "SubCategory",
                id,
              })),
              { type: "SubCategory", id: "LIST" },
            ]
          : [{ type: "SubCategory", id: "LIST" }],
    }),

    createSubCategory: builder.mutation({
      query: (body) => {
        return {
          url: `/subcategories`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "SubCategory", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSubCategoryListForCategQuery,
  useCreateSubCategoryMutation,
} = subCategoriesApiSlice;
