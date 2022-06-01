import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import filmSlide from './slices/filmSlide';
import filterSlice from './slices/filterSlice';
import genreSlice from './slices/genreSlice';

const rootReducer = combineReducers({
  authInfo: authSlice,
  genreInfo: genreSlice,
  filterInfo: filterSlice,
  filmInfo: filmSlide,
});

export default rootReducer;
