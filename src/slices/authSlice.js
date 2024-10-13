import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = "https://connections-api.goit.global/";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  loading: false, // Dodane
  error: null,    // Dodane
};

export const registerUser = createAsyncThunk('auth/register', async (credentials) => {
    const { data } = await axios.post('/users/signup', credentials);
    console.log("Rejestracja użytkownika:", data); // Dodaj log
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    return data;
  });
  
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const { data } = await axios.post('/users/login', credentials);
  axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
  return data;
});


export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post('/users/logout');
  delete axios.defaults.headers.common.Authorization;
});


export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }

    axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;
    const { data } = await axios.get('/users/current');
    return data;
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      resetError: (state) => {
        state.error = null; // Resetuj błąd
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.loading = true; // Ustaw ładowanie na true
          state.error = null;   // Resetuj błąd
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
          state.loading = false; // Ustaw ładowanie na false
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false; // Ustaw ładowanie na false
            console.error("Błąd rejestracji:", action.error); // Dodaj log błędu
            state.error = action.error.message; // Ustaw błąd
          })
        .addCase(fetchCurrentUser.pending, (state) => {
          state.isFetchingCurrentUser = true;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.isFetchingCurrentUser = false;
        })
        .addCase(fetchCurrentUser.rejected, (state) => {
          state.isFetchingCurrentUser = false;
        });
    },
  });
  
  export const { resetError } = authSlice.actions; // Eksportuj akcję resetError
  export default authSlice.reducer;
  
