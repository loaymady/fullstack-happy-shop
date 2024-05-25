import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "auth",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1/auth",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    signUp: builder.mutation({
      query: (body) => {
        return {
          url: `/signup`,
          method: "POST",
          body,
        };
      },
    }),
    logIn: builder.mutation({
      query: (body) => {
        return {
          url: `/login`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useSignUpMutation, useLogInMutation } = authApiSlice;
