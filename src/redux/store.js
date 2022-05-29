import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from '../component/landing/hero/signUpSlice';

const store = configureStore({
  reducer: {
    signUpInfo: signUpSlice,
  },
});

export default store;
