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
    checkoutBook: builder.mutation({
      query: (bookId) => ({
        url: "/reservations",
        method: "POST",
        body: { bookId },
      }),
      invalidatesTags: ["Books", "Reservations"],
    }),
    returnBook: builder.mutation({
      query: (reservationId) => ({
        url: `/reservations/${reservationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books", "Reservations"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCheckoutBookMutation,
  useReturnBookMutation,
} = bookApiSlice;
