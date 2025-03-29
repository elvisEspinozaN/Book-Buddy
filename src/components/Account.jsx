import { useState } from "react";
import { useReturnBookMutation } from "../app/bookApiSlice";
import { useGetMeQuery, useGetReservationsQuery } from "../app/userApi";
import styles from "../styles/Account.module.css";

function Account() {
  const { data, isLoading: isLoadingMe, error: meError } = useGetMeQuery();
  const {
    data: reservations,
    isLoading: isLoadingReservations,
    error: reservationsError,
  } = useGetReservationsQuery();
  const [returnBook] = useReturnBookMutation();
  const [error, setError] = useState(null);

  if (isLoadingMe || isLoadingReservations) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (meError || reservationsError) {
    return <div className={styles.error}>Error loading account details</div>;
  }

  const handleReturn = async (reservationId) => {
    try {
      await returnBook(reservationId).unwrap();
      setError(null);
    } catch (e) {
      setError(e?.data?.message || "Failed to return book.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h2 className={styles.name}>
          {data?.firstname} {data?.lastname}
        </h2>
        <p className={styles.email}>{data?.email}</p>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Your Books</h3>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {reservations?.length === 0 ? (
          <p className={styles.empty}>No books currently checked out</p>
        ) : (
          <div className={styles.reservationsGrid}>
            {reservations?.map((reservation) => (
              <div key={reservation.id} className={styles.reservationCard}>
                <img
                  src={reservation.coverimage}
                  alt={reservation.title}
                  className={styles.bookCover}
                />
                <div className={styles.details}>
                  <h4 className={styles.bookTitle}>{reservation.title}</h4>
                  <p className={styles.bookAuthor}>{reservation.author}</p>
                  <button
                    onClick={() => handleReturn(reservation.id)}
                    className={styles.returnButton}
                  >
                    Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
