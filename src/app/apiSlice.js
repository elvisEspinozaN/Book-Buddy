import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
    validateStatus: (response) =>
      response.status >= 200 && response.status < 300,
    prepareHeaders: (headers, { getState }) => {
      // token management
      const token = getState().auth.token;
      if (token) {
        // attaching token to authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // for cache invalidaiton
  tagTypes: ["Books", "Reservations", "User"],
  endpoints: () => ({}),
});

export default apiSlice;
