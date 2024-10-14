import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, refreshUser, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    isRefreshUser: false,
    user: {
      name: null,
      email: null,
      password: null,
    },
    error: null, 
  },
  reducers: {
    resetError: (state) => {
      state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.pending, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = {
          name: null,
          email: null,
          password: null,
        };
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null; 
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.token = null;
        state.user = {
          name: null,
          email: null,
          password: null,
        };
        state.error = action.error.message; 
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
        state.isRefreshUser = false;
        state.user = {
          name: null,
          email: null,
          password: null,
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        state.isRefreshUser = false;
        state.error = null; 
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message; 
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshUser = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.isRefreshUser = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshUser = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = {
          name: null,
          email: null,
          password: null,
        };
      });
  },
});

export const { resetError } = authSlice.actions; 
export const authReducer = authSlice.reducer;
