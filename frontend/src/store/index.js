import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    trips: tripReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // Disable serializable check for non-serializable values
    })
});

export default store; 