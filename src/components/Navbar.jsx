import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/authSlice";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav>
      <div>
        <Link to="/">BookBuddy</Link>
        {/* Main navigation links */}
        <div>
          <Link to="/books">All Books</Link>
          {token ? (
            <>
              <Link to="/account">Account</Link>
              <button onClick={() => dispatch(logout())}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
