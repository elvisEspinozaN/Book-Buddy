import apiSlice from "./apiSlice";

const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get all books
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["Books"],
    }),
    // single book
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = bookApiSlice;
