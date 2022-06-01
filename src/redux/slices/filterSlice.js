import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moviesAPI from '../../api/services/movieAPI';
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
      sort_by: null,
    },
    response: {
      success: null,
      message: '',
    },
    pagination: {
      page: 1,
      total_pages: 1,
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
    updateSort: (state, action) => {
      state.data.sort_by = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTV.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchTV.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.pagination = action.payload;
      })
      .addCase(fetchMovie.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = 'fulfilled';
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
  updateSort,
} = filterSlice.actions;

export const fetchTV = createAsyncThunk(
  'filter/fetchTV',
  async (param, thunkAPI) => {
    const thunkData = thunkAPI.getState().filterInfo.data;
    const currentPage = thunkAPI.getState().filterInfo.pagination.page;
    const finalPage =
      param && currentPage + param > 0 ? currentPage + param : 1;
    const data = {
      ...thunkData,
      with_genres: thunkData.with_genres.toString(),
      page: finalPage,
    };
    const res = await tvShowsAPI.getTvShows(data);
    return res.data;
  }
);

export const fetchMovie = createAsyncThunk(
  'filter/fetchMovie',
  async (param, thunkAPI) => {
    const thunkData = thunkAPI.getState().filterInfo.data;
    const currentPage = thunkAPI.getState().filterInfo.pagination.page;
    const finalPage =
      param && currentPage + param > 0 ? currentPage + param : 1;
    const data = {
      ...thunkData,
      with_genres: thunkData.with_genres.toString(),
      'release_date.gte': thunkData['air_date.gte'],
      'release_date.lte': thunkData['air_date.lte'],
      page: finalPage,
    };
    const res = await moviesAPI.getMovies(data);
    return res.data;
  }
);

export default filterSlice.reducer;
