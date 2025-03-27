import apiSlice from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body,
      }),
    }),
    getMe: builder.query({
      query: () => "/users/me",
      transformResponse: (response) => response,
    }),
    getReservations: builder.query({
      query: () => "/reservations",
      providesTags: ["Reservations"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useGetReservationsQuery,
} = userApi;
