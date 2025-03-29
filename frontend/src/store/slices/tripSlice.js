import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tripApi } from '../../utils/api';

// Async thunks
export const fetchTrips = createAsyncThunk(
  'trips/fetchTrips',
  async () => {
    const response = await tripApi.getAll();
    return response.data.data;
  }
);

export const createTrip = createAsyncThunk(
  'trips/createTrip',
  async (tripData) => {
    const response = await tripApi.create(tripData);
    return response.data.data;
  }
);

export const updateTrip = createAsyncThunk(
  'trips/updateTrip',
  async ({ id, data }) => {
    const response = await tripApi.update(id, data);
    return response.data.data;
  }
);

export const deleteTrip = createAsyncThunk(
  'trips/deleteTrip',
  async (id) => {
    await tripApi.delete(id);
    return id;
  }
);

const initialState = {
  trips: [],
  loading: false,
  error: null
};

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch trips
      .addCase(fetchTrips.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTrips.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create trip
      .addCase(createTrip.fulfilled, (state, action) => {
        state.trips.push(action.payload);
      })
      // Update trip
      .addCase(updateTrip.fulfilled, (state, action) => {
        const index = state.trips.findIndex(trip => trip._id === action.payload._id);
        if (index !== -1) {
          state.trips[index] = action.payload;
        }
      })
      // Delete trip
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.trips = state.trips.filter(trip => trip._id !== action.payload);
      });
  }
});

export const { clearError } = tripSlice.actions;
export default tripSlice.reducer; 