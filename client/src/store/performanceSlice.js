import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching performance data from database
export const fetchPerformanceData = createAsyncThunk(
  'performance/fetchPerformanceData',
  async (_, { rejectWithValue, getState }) => {
    try {
      console.log('🔄 Fetching data from database API...');
      
      // Get token from auth state
      const state = getState();
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      console.log('🔑 Using token for API request');
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header with the token
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // ✅ FIX: Use environment variable for base URL
      const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';
      
      // Remove '/api' from the URL since your environment variable already includes it
      const apiUrl = API_BASE_URL.endsWith('/api') 
        ? `${API_BASE_URL}/performance/` 
        : `${API_BASE_URL}/api/performance/`;
      
      console.log('🌐 API URL:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: headers,
      });
      
      console.log('📡 API Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        // Get detailed error message
        let errorMessage = `HTTP Error: ${response.status} - ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          console.log('Response is not JSON, using status text');
        }
        
        // Handle specific HTTP status codes
        if (response.status === 401) {
          errorMessage = 'Authentication failed. Token may be expired. Please login again.';
        } else if (response.status === 403) {
          errorMessage = 'Access forbidden. You do not have permission to access this resource.';
        } else if (response.status === 404) {
          errorMessage = 'API endpoint not found. Please check the server URL.';
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('✅ Data fetched successfully from database:', data);
      
      // Validate data structure
      if (!Array.isArray(data)) {
        console.error('❌ Invalid data format: Expected array but got:', typeof data);
        throw new Error('Invalid data format received from server');
      }
      
      if (data.length === 0) {
        console.warn('⚠️ No data returned from database');
      }
      
      return data;
      
    } catch (error) {
      console.error('❌ Database fetch failed:', error.message);
      
      // Provide more specific error messages
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';
        throw new Error(`Network error: Cannot connect to server at ${API_BASE_URL}. Make sure your backend is running.`);
      }
      
      throw new Error(error.message);
    }
  }
);

const performanceSlice = createSlice({
  name: 'performance',
  initialState: {
    data: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearPerformanceData: (state) => {
      state.data = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPerformanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        state.lastFetched = new Date().toISOString();
        
        console.log('📊 Database data stored in Redux');
        console.log('📈 Records loaded:', state.data.length);
      })
      .addCase(fetchPerformanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error('🚨 Database fetch rejected:', action.payload);
      });
  }
});

export const { clearPerformanceData, clearError } = performanceSlice.actions;
export default performanceSlice.reducer;