import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import tvShowsAPI from '../../api/services/tvShowsAPI';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    status: 'idle',
    data: {
      'air_date.gte': null,
      'air_date.lte': null,
      with_genres: null,
      'vote_average.gte': null,
      'vote_count.gte': null,
      'with_runtime.gte': null,
      'with_runtime.lte': null,
    },
    response: {
      success: null,
      message: '',
    },
    pagination: {
      page: null,
      total_pages: null,
      total_results: null,
      results: null,
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
      state.data['vote_count.gte'] = action.payload;
    },
    updateVoteAvg: (state, action) => {
      state.data['vote_average.gte'] = action.payload;
    },
    updateRuntimes: (state, action) => {
      state.data['with_runtime.gte'] = action.payload['with_runtime.gte'];
      state.data['with_runtime.lte'] = action.payload['with_runtime.lte'];
    },
    updateRuntimesGTE: (state, action) => {
      state.data['with_runtime.gte'] = action.payload;
    },
    updateRuntimesLTE: (state, action) => {
      state.data['with_runtime.lte'] = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTV.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchTV.fulfilled, (state, action) => {
        state.status = 'idle';
        state.pagination = action.payload;
      });
  },
});

export const {
  updateAirDateGTE,
  updateAirDateLTE,
  updateGenres,
  updateVoteCount,
  updateVoteAvg,
  updateRuntimesGTE,
  updateRuntimesLTE,
  updateRuntimes,
} = filterSlice.actions;

export const fetchTV = createAsyncThunk(
  'filter/fetch',
  async (tmp, thunkAPI) => {
    const thunkData = thunkAPI.getState().filterInfo.data;
    const data = {
      ...thunkData,
      with_genres: thunkData.with_genres.toString(),
    };
    const res = await tvShowsAPI.getTvShows(data);
    return res.data;
  }
);

export default filterSlice.reducer;
