import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import filmSlice from './slices/filmSlice';
import filterSlice from './slices/filterSlice';
import friendSlice from './slices/friendSlice';
import genreSlice from './slices/genreSlice';

const rootReducer = combineReducers({
  authInfo: authSlice,
  genreInfo: genreSlice,
  filterInfo: filterSlice,
  filmInfo: filmSlice,
  userInfo: friendSlice,
});

export default rootReducer;
