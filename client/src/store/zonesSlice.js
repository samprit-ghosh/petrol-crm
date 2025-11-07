import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig'; 

export const fetchZonesData = createAsyncThunk(
  'zones/fetchZonesData',
  async (_, { rejectWithValue }) => {
    try {
      // console.log('🔄 Starting API call to fetch outlets...');
      const response = await axiosInstance.get('/outlets?zone');
      
      // Transform the array of outlets into zone-based structure
      const outletsArray = response.data;
      
      if (!Array.isArray(outletsArray)) {
        throw new Error('Invalid API response format');
      }
      
      console.log('📥 Raw API response data:', outletsArray);
      
      // Group outlets by zone name
      const zonesData = {};
      
      outletsArray.forEach((outlet, index) => {
        console.log(`🔍 Processing outlet ${index}:`, outlet.name);
        console.log(`   Dealer data:`, outlet.dealer);
        console.log(`   RO Manager data:`, outlet.roManager);
        console.log(`   SO data:`, outlet.so);
        console.log(`   Facilities data:`, outlet.facilities);
        
        const zoneName = outlet.zone?.name || 'Unknown Zone';
        
        // Create zone if it doesn't exist
        if (!zonesData[zoneName]) {
          zonesData[zoneName] = [];
        }
        
        // ✅ USE THE OUTLET OBJECT DIRECTLY - NO NEW OBJECT CREATION
        // Add status field if it doesn't exist
        const outletWithStatus = {
          ...outlet,
          status: outlet.status || 'active'
        };
        
        zonesData[zoneName].push(outletWithStatus);
      });
      
      // console.log('✅ Final processed zones data:', zonesData);
      return zonesData;
    } catch (error) {
      console.error('❌ Error fetching zones data:', error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch zones data');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Additional thunk for fetching single outlet details
export const fetchOutletDetails = createAsyncThunk(
  'zones/fetchOutletDetails',
  async (outletId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/outlets/${outletId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch outlet details');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating new outlet
export const createOutlet = createAsyncThunk(
  'zones/createOutlet',
  async (outletData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/outlets', outletData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to create outlet');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating outlet
export const updateOutlet = createAsyncThunk(
  'zones/updateOutlet',
  async ({ outletId, outletData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/outlets/${outletId}`, outletData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to update outlet');
      }
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting outlet
export const deleteOutlet = createAsyncThunk(
  'zones/deleteOutlet',
  async (outletId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/outlets/${outletId}`);
      return outletId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to delete outlet');
      }
      return rejectWithValue(error.message);
    }
  }
);

const zonesSlice = createSlice({
  name: 'zones',
  initialState: {
    zones: null,
    currentOutlet: null,
    loading: false,
    error: null,
    operationLoading: false,
    operationError: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.operationError = null;
    },
    setZones: (state, action) => {
      state.zones = action.payload;
    },
    resetZones: (state) => {
      state.zones = null;
      state.currentOutlet = null;
      state.loading = false;
      state.error = null;
      state.operationLoading = false;
      state.operationError = null;
    },
    clearCurrentOutlet: (state) => {
      state.currentOutlet = null;
    },
    clearOperationState: (state) => {
      state.operationLoading = false;
      state.operationError = null;
    },
    // Debug action to check current state
    debugState: (state) => {
      // console.log('🔍 Current zones state:', state);
      if (state.zones) {
        Object.keys(state.zones).forEach(zoneName => {
          // console.log(`🔍 Zone: ${zoneName}`, state.zones[zoneName][0]);
        });
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch zones data
      .addCase(fetchZonesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZonesData.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload;
        state.error = null;
        // console.log('✅ Zones data loaded successfully into Redux store');
        
        // Debug: Check first outlet data
        if (state.zones) {
          const firstZone = Object.keys(state.zones)[0];
          if (firstZone && state.zones[firstZone][0]) {
            // console.log('🔍 First outlet in Redux store:', state.zones[firstZone][0]);
          }
        }
      })
      .addCase(fetchZonesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.error('❌ Failed to load zones data:', action.payload);
      })
      
      // Fetch outlet details
      .addCase(fetchOutletDetails.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(fetchOutletDetails.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.currentOutlet = action.payload;
        state.operationError = null;
      })
      .addCase(fetchOutletDetails.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      
      // Create outlet
      .addCase(createOutlet.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(createOutlet.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
        // Optionally add the new outlet to the zones state
        if (state.zones && action.payload.zone) {
          const zoneName = action.payload.zone.name;
          if (!state.zones[zoneName]) {
            state.zones[zoneName] = [];
          }
          state.zones[zoneName].push(action.payload);
        }
      })
      .addCase(createOutlet.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      
      // Update outlet
      .addCase(updateOutlet.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(updateOutlet.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
        // Update the outlet in the zones state
        if (state.zones && action.payload.zone) {
          const zoneName = action.payload.zone.name;
          if (state.zones[zoneName]) {
            const outletIndex = state.zones[zoneName].findIndex(
              outlet => outlet._id === action.payload._id
            );
            if (outletIndex !== -1) {
              state.zones[zoneName][outletIndex] = action.payload;
            }
          }
        }
        // Update current outlet if it's the one being edited
        if (state.currentOutlet && state.currentOutlet._id === action.payload._id) {
          state.currentOutlet = action.payload;
        }
      })
      .addCase(updateOutlet.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      })
      
      // Delete outlet
      .addCase(deleteOutlet.pending, (state) => {
        state.operationLoading = true;
        state.operationError = null;
      })
      .addCase(deleteOutlet.fulfilled, (state, action) => {
        state.operationLoading = false;
        state.operationError = null;
        // Remove the outlet from the zones state
        if (state.zones) {
          Object.keys(state.zones).forEach(zoneName => {
            state.zones[zoneName] = state.zones[zoneName].filter(
              outlet => outlet._id !== action.payload
            );
          });
        }
        // Clear current outlet if it's the one being deleted
        if (state.currentOutlet && state.currentOutlet._id === action.payload) {
          state.currentOutlet = null;
        }
      })
      .addCase(deleteOutlet.rejected, (state, action) => {
        state.operationLoading = false;
        state.operationError = action.payload;
      });
  },
});

export const { 
  clearError, 
  setZones, 
  resetZones, 
  clearCurrentOutlet, 
  clearOperationState,
  debugState 
} = zonesSlice.actions;

export default zonesSlice.reducer;