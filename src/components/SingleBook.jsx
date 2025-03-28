import { useParams } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useCheckoutBookMutation,
  useGetBooksQuery,
} from "../app/bookApiSlice";
import { useState } from "react";

function SingleBook() {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetBookByIdQuery(id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [checkoutBook] = useCheckoutBookMutation();
  const { refetch: refetchBooks } = useGetBooksQuery();

  const handleCheckout = async () => {
    setError(null);
    setSuccess(null);
    try {
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
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <img src={data.coverimage} alt={data.title} />
      <h2>{data.title}</h2>
      <h3>By {data.author}</h3>
      <p>{data.description}</p>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
      {data.available ? (
        <button onClick={handleCheckout}>Checkout</button>
      ) : (
        <p>This book is currently unavailable</p>
      )}
    </div>
  );
}

export default SingleBook;
