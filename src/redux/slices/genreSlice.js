import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tvShowsAPI from '../../api/services/tvShowsAPI';

const genreSlice = createSlice({
  name: 'genre',
  initialState: {
    status: 'idle',
    data: [],
    response: {
      success: null,
      message: '',
    },
  },
  reducers: {
    getGenre: (state, action) => {
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

export const { getGenre } = genreSlice.actions;

export const fetchGenre = createAsyncThunk('genre/fetch', async () => {
  console.log('object');
  const res = await tvShowsAPI.getGenres();
  return res.data;
});

export default genreSlice.reducer;
