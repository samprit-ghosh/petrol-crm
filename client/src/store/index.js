import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import regReducer from './regSlice';
import zonesReducer from './zonesSlice';
import usersReducer from './usersSlice'; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: regReducer,
    zones: zonesReducer,
    users: usersReducer,
  },
});

export default store;