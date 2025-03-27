import { useGetMeQuery } from "../app/userApi";

function Account() {
  const { data, isLoading } = useGetMeQuery();
  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <h2>
        {data.firstname} {data.lastname}
      </h2>
      <p>Email: {data.email}</p>
      <h3>Your Books</h3>
    </div>
  );
}

export default Account;
