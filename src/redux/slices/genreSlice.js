import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moviesAPI from '../../api/services/movieAPI';
import tvShowsAPI from '../../api/services/tvShowsAPI';

const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    status: 'idle',
    data: [],
  },
  reducers: {
    setGenre: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGenre.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchGenre.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = [...action.payload.genres];
      });
  },
});

export const { setGenre } = genreSlice.actions;

export const fetchGenre = createAsyncThunk('genre/fetch', async variant => {
  const res = await (variant === 'tv'
    ? tvShowsAPI.getGenres()
    : moviesAPI.getGenres());
  return res.data;
});

export default genreSlice.reducer;
