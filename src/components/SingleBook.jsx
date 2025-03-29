import { useParams } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useCheckoutBookMutation,
  useGetBooksQuery,
} from "../app/bookApiSlice";
import { useState } from "react";
import styles from "../styles/SingleBook.module.css";

function SingleBook() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetBookByIdQuery(id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [checkoutBook] = useCheckoutBookMutation();
  // refetching all books after checkout
  const { refetch: refetchBooks } = useGetBooksQuery();

  const handleCheckout = async () => {
    setError(null);
    setSuccess(null);
    try {
      // fetching book and checkout mutation
      await checkoutBook(data.id).unwrap();
      setSuccess("Successfully checked out!");
      refetch();
      refetchBooks();
    } catch (e) {
      setError(e?.data?.message || "Failed to checkout.");
    }
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.bookContainer}>
        <img src={data.coverimage} alt={data.title} className={styles.cover} />

        <div className={styles.details}>
          <h1 className={styles.title}>{data.title}</h1>
          <h2 className={styles.author}>By {data.author}</h2>

          <div className={styles.status}>
            {data.available ? (
              <span className={styles.available}>Available</span>
            ) : (
              <span className={styles.unavailable}>Checked Out</span>
            )}
          </div>

          <p className={styles.description}>{data.description}</p>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          {data.available ? (
            <button onClick={handleCheckout} className={styles.button}>
              Checkout Book
            </button>
          ) : (
            <p className={styles.unavailableText}>
              This book will be available soon
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleBook;
