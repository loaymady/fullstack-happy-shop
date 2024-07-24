import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "products",
  //= queryKey in react-query, for caching
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET Products
    getProductList: builder.query({
      query: (arg) => {
        return {
          url: `/products?limit=${arg.limit}&page=${arg.page}`,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),

    //** GET Products
    getProductListLike: builder.query({
      query: (arg) => {
        return {
          url: arg.category
            ? `/products?category=${arg.category}`
            : `/products`,
        };
      },
    }),

    //** GET Product
    getProduct: builder.query({
      query: (arg) => {
        return {
          url: `/products/${arg.id}`,
        };
      },
    }),

    createProduct: builder.mutation({
      query: (body) => {
        return {
          url: `/products`,
          method: "POST",
          body,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/products/${id}`,
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
          productsApiSlice.util.updateQueryData(
            "getProductList",
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
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),

    //** GET Products By Category
    getProductListByCategory: builder.query({
      query: (arg) => {
        return {
          url: `/products?category=${arg.id}&limit=${arg.limit}&page=${arg.page}`,
        };
      },
    }),
    //** GET Products By Brand
    getProductListByBrand: builder.query({
      query: (arg) => {
        return {
          url: `/products?brand=${arg.id}&limit=${arg.limit}&page=${arg.page}`,
        };
      },
    }),

    //** GET Products By Searchs
    //** GET Products By Search
    SearchProducts: builder.query({
      query: (arg) => {
        const categories =
          arg.category && arg.category.length
            ? arg.category.map((val) => `category[in][]=${val}`).join("&")
            : "";
        const brands =
          arg.brand && arg.brand.length
            ? arg.brand.map((val) => `brand[in][]=${val}`).join("&")
            : "";

        const priceFrom =
          arg.priceFrom && arg.priceFrom !== 0
            ? `price[gte]=${arg.priceFrom}`
            : "";

        const priceTo =
          arg.priceTo && arg.priceTo !== 0 ? `price[lte]=${arg.priceTo}` : "";

        const sort = arg.sort && arg.sort !== "" ? `&sort=${arg.sort}` : "";

        const limit = arg.limit ? `&limit=${arg.limit}` : "";
        const page = arg.page ? `&page=${arg.page}` : "";

        // Combine the parameters with proper formatting
        const queryParams = [
          categories,
          brands,
          priceFrom,
          priceTo,
          sort,
          limit,
          page,
        ]
          .filter(Boolean)
          .join("&");

        return {
          url: `/products?${queryParams}`,
        };
      },
    }),
  }),
});

export const {
  useGetProductListQuery,
  useCreateProductMutation,
  useGetProductQuery,
  useGetProductListLikeQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductListByCategoryQuery,
  useGetProductListByBrandQuery,
  useSearchProductsQuery,
} = productsApiSlice;
