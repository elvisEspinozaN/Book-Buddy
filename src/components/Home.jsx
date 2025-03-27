import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to BookBuddy</h1>
      <p>
        Explore our collection of books or create an account to start borrowing!
      </p>
      <div>
        <Link to="/books">Browse Books</Link>
        <Link to="/register">Join Now</Link>
      </div>
    </div>
  );
}

export default Home;
