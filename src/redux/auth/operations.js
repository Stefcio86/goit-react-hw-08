import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
const response = await axios.post("/users/signup", credentials);
localStorage.setItem('token', response.data.token);
setAuthHeader(response.data.token);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
const response = await axios.post("/users/login", credentials);
localStorage.setItem('token', response.data.token);
setAuthHeader(response.data.token);

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const persistToken = localStorage.getItem('token');

    if (!persistToken) {
      return thunkAPI.rejectWithValue("No token available");
    }
    try {
      setAuthHeader(persistToken);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 401) {
        clearAuthHeader();
        localStorage.removeItem('token');
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
