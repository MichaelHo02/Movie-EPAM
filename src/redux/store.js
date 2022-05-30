import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import genreSlice from './slices/genreSlice';

const store = configureStore({
  reducer: {
    authInfo: authSlice,
    genreInfo: genreSlice,
  },
});

export default store;
