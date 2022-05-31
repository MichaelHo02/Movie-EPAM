import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tvShowsAPI from '../../api/services/tvShowsAPI';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    status: 'idle',
    data: {
      'air_date.gte': '',
      'air_date.lte': '',
      with_genres: [],
      'vote_count.gte': 0,
      'with_runtime.gte': 0,
      'with_runtime.lte': 0,
    },
    response: {
      success: null,
      message: '',
    },
  },
  reducers: {
    updateAirDateGTE: (state, action) => {
      state.data['air_date.gte'] = action.payload;
    },
    updateAirDateLTE: (state, action) => {
      state.data['air_date.lte'] = action.payload;
    },
    updateGenres: (state, action) => {
      state.data['with_genres'] = action.payload;
    },
    updateVoteCount: (state, action) => {
      state.data['vote_count'] = action.payload;
    },
    updateRuntimesGTE: (state, action) => {
      state.data['with_runtime.gte'] = action.payload;
    },
    updateRuntimesLTE: (state, action) => {
      state.data['with_runtime.lte'] = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTV.pending, (state, action) => {
      state.status = 'pending';
    });
  },
});

export const {
  updateAirDateGTE,
  updateAirDateLTE,
  updateGenres,
  updateVoteCount,
  updateRuntimesGTE,
  updateRuntimesLTE,
} = filterSlice.actions;

export const fetchTV = createAsyncThunk('filter/fetch', async thunkAPI => {
  console.log(thunkAPI.getState);
  // const res = await tvShowsAPI.getTvShows();
});

export default filterSlice.reducer;
