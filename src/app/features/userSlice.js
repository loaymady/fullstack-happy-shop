import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  //name of the slice = name in const cartSlice = createSlice({ name: "cart",
  reducerPath: "userapi",
  //= queryKey in react-query, for caching
  tagTypes: ["UserApi"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/v1/users",
  }),
  endpoints: (builder) => ({
    //return hook for fetching data

    //** GET User
    getUser: builder.query({
      query: () => {
        return {
          url: `/getMe`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: [{ type: "UserApi", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (body) => {
        return {
          url: `/updateMe`,
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
          userApiSlice.util.updateQueryData("getUser", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "UserApi", id: "LIST" }],
    }),

    changeMyPassword: builder.mutation({
      query: (body) => {
        return {
          url: `/changeMyPassword`,
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
          userApiSlice.util.updateQueryData("getUser", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "UserApi", id: "LIST" }],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useChangeMyPasswordMutation,
} = userApiSlice;
