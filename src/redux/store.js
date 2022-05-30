import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const store = configureStore({
  reducer: {
    authInfo: authSlice,
  },
});

export default store;
