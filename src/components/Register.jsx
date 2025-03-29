import { useState } from "react";
import { useRegisterMutation } from "../app/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/authSlice";
import styles from "../styles/Register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      const response = await register(formData).unwrap();
      dispatch(
        setCredentials({
          token: response.token,
          user: response.user,
        })
      );
      navigate("/account");
    } catch (e) {
      setError(e.data?.error?.message || "Registration failed");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Create Account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <input
            placeholder="First Name"
            value={formData.firstname}
            onChange={(e) =>
              setFormData({ ...formData, firstname: e.target.value })
            }
            className={styles.input}
          />
          <input
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) =>
              setFormData({ ...formData, lastname: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
