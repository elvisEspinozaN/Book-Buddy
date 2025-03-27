import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/bookApiSlice";
import { useState } from "react";

function BookList() {
  // fetching books
  const { data, isError, isLoading } = useGetBooksQuery();
  const [search, setSearch] = useState("");

  const filteredBooks = data?.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p>Error loading books, try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Search Results */}
        {search && (
          <div>
            <h4>Search Results:</h4>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Link to={`/books/${book.id}`} key={book.id}>
                  <h3>{book.title}</h3>
                </Link>
              ))
            ) : (
              <p>No books found.</p>
            )}
          </div>
        )}

        {/* All Books */}
        <div>
          <h4>All Books:</h4>
          {data.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id}>
              <h3>{book.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookList;
