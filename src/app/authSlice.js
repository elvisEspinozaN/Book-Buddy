import { createSlice } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";

const initialState = {
  // fetch token from localStorage
  token: localStorage.getItem("token") || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // saving token from payloaf to state
      state.token = action.payload.token;
      // persistance
      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    // setting user object
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // automati clogout on auth failure
    builder.addMatcher(apiSlice.endpoints.getMe.matchRejected, (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    });
  },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
