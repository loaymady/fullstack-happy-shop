import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "auth",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://happy-shop-backend-eight.vercel.app/api/v1/auth",
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
    forgetPass: builder.mutation({
      query: (body) => {
        return {
          url: `/forgotPasswords`,
          method: "POST",
          body,
        };
      },
    }),
    verifyCode: builder.mutation({
      query: (body) => {
        return {
          url: `/verifyResetCode`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/resetPassword`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
});

export const {
  useSignUpMutation,
  useLogInMutation,
  useForgetPassMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} = authApiSlice;
