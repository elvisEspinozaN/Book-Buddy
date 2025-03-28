import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/bookApiSlice";
import { useState } from "react";
import styles from "../styles/BookList.module.css";

function BookList() {
  const { data, isError, isLoading } = useGetBooksQuery();
  const [search, setSearch] = useState("");

  const filteredBooks = data?.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const availableBooks = data?.filter((book) => book.available) || [];
  const unavailableBooks = data?.filter((book) => !book.available) || [];

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (isError) return <div className={styles.error}>Failed to load books</div>;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search books by title or author..."
          className={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {search && filteredBooks.length > 0 && (
        <div className={styles.section}>
          <h2>Search Results</h2>
          <div className={styles.searchResults}>
            {filteredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className={styles.bookCard}
              >
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className={styles.thumbnail}
                />
                <div className={styles.bookInfo}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <span
                    className={
                      book.available ? styles.available : styles.unavailable
                    }
                  >
                    {book.available ? "Available" : "Checked Out"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={styles.mainContent}>
        <div className={styles.section}>
          <h2>Books</h2>
          <div className={styles.booksGrid}>
            {availableBooks.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className={styles.bookCard}
              >
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className={styles.thumbnail}
                />
                <div className={styles.bookInfo}>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Coming Back Soon </h2>
          <div className={styles.comingSoonList}>
            {unavailableBooks.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className={styles.comingSoonItem}
              >
                {book.title} by {book.author}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookList;
