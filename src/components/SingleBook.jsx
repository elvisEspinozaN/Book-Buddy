import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../app/bookApiSlice";

function SingleBook() {
  const { id } = useParams();
  const { data, isLoading } = useGetBookByIdQuery(id);

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
      {data.available ? (
        <button>Checkout</button>
      ) : (
        <p>This book is currently unavailable</p>
      )}
    </div>
  );
}

export default SingleBook;
