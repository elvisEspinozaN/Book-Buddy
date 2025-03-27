import { useState } from "react";
import { useReturnBookMutation } from "../app/bookApiSlice";
import { useGetMeQuery, useGetReservationsQuery } from "../app/userApi";

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
    return <p>Loading...</p>;
  }

  if (meError || reservationsError) {
    return <p>Error loading account details</p>;
  }

  const handleReturn = async (reservationId) => {
    try {
      await returnBook(reservationId).unwrap();
    } catch (e) {
      setError(e?.data?.message || "Failed to return book.");
    }
  };

  return (
    <div>
      <h2>
        {data?.firstname} {data?.lastname}
      </h2>
      <p>Email: {data?.email}</p>
      <h3>Your Books</h3>
      {error && <div>{error}</div>}
      {(reservations?.length > 0 ? reservations : []).map((reservation) => (
        <div key={reservation.id}>
          {reservation.title}
          <button onClick={() => handleReturn(reservation.id)}>
            Return Book
          </button>
        </div>
      ))}
    </div>
  );
}

export default Account;
