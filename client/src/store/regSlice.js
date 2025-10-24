// store/regSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Initial State
const initialState = {
  registerLoading: false,
  registerError: null,
  registerSuccess: false,
  fetchLoading: false,
  fetchError: null,
  allData: [],
};

// Register User Thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Fetch all data thunk
export const fetchAllData = createAsyncThunk(
  "auth/fetchAll",
  async (_, { rejectWithValue }) => {
    console.log("fetchAllData triggered");
    try {
      const res = await axios.get(`${API_URL}/all`);
      console.log("Fetched from DB:", res.data);
      return res.data;
    } catch (err) {
      console.log("Fetch error:", err);
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

const regSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
    },
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerError = null;
      state.registerSuccess = false;
    },
    clearFetchError: (state) => {
      state.fetchError = null;
    },
    clearAllData: (state) => {
      state.allData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      })
      .addCase(fetchAllData.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllData.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.allData = action.payload;
      })
      .addCase(fetchAllData.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchError = action.payload;
      });
  },
});

export const {
  clearRegisterError,
  clearRegisterSuccess,
  resetRegisterState,
  clearFetchError,
  clearAllData,
} = regSlice.actions;

export default regSlice.reducer;
