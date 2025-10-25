




import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig'; 

export const fetchZonesData = createAsyncThunk(
  'zones/fetchZonesData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/outlets?zone');
      
      // Transform the array of outlets into zone-based structure
      const outletsArray = response.data;
      
      if (!Array.isArray(outletsArray)) {
        throw new Error('Invalid API response format');
      }
      
      // Group outlets by zone name
      const zonesData = {};
      
      outletsArray.forEach(outlet => {
        const zoneName = outlet.zone?.name || 'Unknown Zone';
        
        // Create zone if it doesn't exist
        if (!zonesData[zoneName]) {
          zonesData[zoneName] = [];
        }
        
        // Add outlet to the zone
        zonesData[zoneName].push({
          id: outlet._id,
          name: outlet.name,
          code: outlet.code,
          status: 'active', // You might need to adjust this based on your data
          footfallType: outlet.footfallType,
          zone: outlet.zone, 
          address: outlet.address 
        });
      });
      
      return zonesData;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Failed to fetch zones data');
      }
      return rejectWithValue(error.message);
    }
  }
);

const zonesSlice = createSlice({
  name: 'zones',
  initialState: {
    zones: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setZones: (state, action) => {
      state.zones = action.payload;
    },
    resetZones: (state) => {
      state.zones = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZonesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchZonesData.fulfilled, (state, action) => {
        state.loading = false;
        state.zones = action.payload;
        state.error = null;
      })
      .addCase(fetchZonesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setZones, resetZones } = zonesSlice.actions;
export default zonesSlice.reducer;