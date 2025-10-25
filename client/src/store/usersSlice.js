import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 Fetching users from API...');
      const response = await axiosInstance.get('/users');
      
      // Console log the API response
      console.log('✅ API Response:', response.data);
      console.log('📊 Number of users:', response.data.length);
      console.log('👥 Users data:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching users:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch users');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('🔄 Creating user:', userData);
      const response = await axiosInstance.post('/users', userData);
      console.log('✅ User created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating user:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to create user');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      console.log(`🔄 Updating user ${id}:`, userData);
      const response = await axiosInstance.put(`/users/${id}`, userData);
      console.log('✅ User updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating user:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to update user');
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      console.log(`🔄 Deleting user ${id}`);
      await axiosInstance.delete(`/users/${id}`);
      console.log('✅ User deleted successfully');
      return id;
    } catch (error) {
      console.error('❌ Error deleting user:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to delete user');
      }
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    // Add a new reducer to console log current users
    logUsers: (state) => {
      console.log('📋 Current users in Redux store:', state.users);
      console.log('👤 User details:');
      state.users.forEach((user, index) => {
        console.log(`  ${index + 1}.`, user);
      });
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchAllUsers.pending, (state) => {
        console.log('⏳ Loading users...');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        console.log('🎉 Users loaded successfully into Redux');
        console.log('🏪 Redux store users count:', action.payload.length);
        state.loading = false;
        state.users = action.payload;
        state.error = null;
        
        // Log the users in Redux store
        console.log('🛒 Redux store users:', state.users);
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        console.error('💥 Failed to load users:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Create user
      .addCase(createUser.pending, (state) => {
        console.log('⏳ Creating user...');
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log('🎉 User added to Redux store');
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
        console.log('🛒 Updated Redux store users count:', state.users.length);
      })
      .addCase(createUser.rejected, (state, action) => {
        console.error('💥 Failed to create user:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Update user
      .addCase(updateUser.pending, (state) => {
        console.log('⏳ Updating user...');
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log('🎉 User updated in Redux store');
        state.loading = false;
        const index = state.users.findIndex(user => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
        console.log('✅ User updated successfully in store');
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.error('💥 Failed to update user:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      // Delete user
      .addCase(deleteUser.pending, (state) => {
        console.log('⏳ Deleting user...');
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log('🎉 User deleted from Redux store');
        state.loading = false;
        state.users = state.users.filter(user => user._id !== action.payload);
        state.error = null;
        console.log('🛒 Updated Redux store users count:', state.users.length);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.error('💥 Failed to delete user:', action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearUsers, logUsers } = usersSlice.actions;
export default usersSlice.reducer;