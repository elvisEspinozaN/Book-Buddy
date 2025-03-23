import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  // for cache invalidaiton
  tagTypes: ["Books"],
  endpoints: () => ({}),
});

export default apiSlice;
