import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/authSlice";
import styles from "../styles/Navbar.module.css";

function Navbar() {
  // checking active token
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.brand}>
          BookBuddy
        </Link>

        <nav className={styles.navLinks}>
          <Link to="/books" className={styles.link}>
            All Books
          </Link>

          {token ? (
            <>
              <Link to="/account" className={styles.link}>
                Account
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className={styles.logoutButton}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.link}>
                Login
              </Link>
              <Link to="/register" className={styles.link}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
