import { Link } from "react-router-dom";
import { useGetBooksQuery } from "../app/bookApiSlice";

function BookList() {
  // fetching books
  const { data, isError, isLoading } = useGetBooksQuery();

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

  console.log(data);
  return (
    <div>
      {data.map((book) => (
        <Link to={`/books/${book.id}`} key={book.id}>
          <h3>{book.title}</h3>
        </Link>
      ))}
    </div>
  );
}

export default BookList;
