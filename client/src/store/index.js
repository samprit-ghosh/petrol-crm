import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import regReducer from './regSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: regReducer,
  },
});

export default store;