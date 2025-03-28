import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/bookApiSlice";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

function Home() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    if (books) {
      const availableBooks = books.filter((book) => book.available);
      const shuffled = [...availableBooks].sort(() => 0.5 - Math.random());
      setRandomBooks(shuffled.slice(0, 10));
    }
  }, [books]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to BookBuddy</h1>
      <p className={styles.subtitle}>
        Explore our collection of books or create an account to start borrowing!
      </p>

      {!isLoading && !isError && (
        <div className={styles.carousel}>
          {randomBooks.map((book) => (
            <div key={book.id} className={styles.carouselItem}>
              <Link to={`/books/${book.id}`}>
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className={styles.bookCover}
                />
              </Link>
              <h4 className={styles.bookTitle}>{book.title}</h4>
              <p className={styles.bookAuthor}>{book.author}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.browseContainer}>
        <Link to="/books" className={styles.browseButton}>
          Browse All Books
        </Link>
        <Link to="/register" className={styles.browseButton}>
          Join Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
