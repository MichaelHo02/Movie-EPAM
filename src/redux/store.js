import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import filterSlice from './slices/filterSlice';
import genreSlice from './slices/genreSlice';

const store = configureStore({
  reducer: {
    authInfo: authSlice,
    genreInfo: genreSlice,
    filterInfo: filterSlice,
  },
});

export default store;
