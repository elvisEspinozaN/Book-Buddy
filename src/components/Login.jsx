import { useState } from "react";
import { useLoginMutation } from "../app/userApi";
import { useDispatch } from "react-redux";
import { setCredentials, setUser } from "../app/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ token: response.token }));
      // sends user info
      dispatch(setUser(response.user));
      navigate("/account");
    } catch (E) {
      console.error("Login Failed", E);
      setError(E.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Login to BookBuddy</h2>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
