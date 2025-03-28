import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import BookList from "./components/BookList";
import SingleBook from "./components/SingleBook";
import Login from "./components/Login";
import Register from "./components/Register";
import { useDispatch } from "react-redux";
import { PrivateRoute } from "./components/PrivateRoute";
import Account from "./components/Account";
import { useGetMeQuery } from "./app/userApi";
import { useEffect } from "react";
import { setUser } from "./app/authSlice";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const { data } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>Page Not Found.</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
