import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';
import tvShowsAPI from '../../api/services/tvShowsAPI';

const filmSlide = createSlice({
  name: 'film',
  initialState: {
    status: 'idle',
    data: {
      likes: [],
      favorites: [],
    },
    response: {
      success: null,
      message: '',
    },
  },
  reducer: {
    setLikes: (state, action) => {
      state.data.likes = [...state.data.like, action.payload];
    },
    setFavorites: (state, action) => {
      state.data.favorites = [...state.data.favorites, action.payload];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateLikes.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload);
      });
  },
});

export const { setLikes, setFavorites } = filmSlide.actions;

export const updateLikes = createAsyncThunk(
  'film/likes',
  async ({ id, variant }, thunkAPI) => {
    const film = await (variant === 'tv' ? tvShowsAPI.getTvShow(id) : null);
    console.log(film.data);
    const email = thunkAPI.getState().authInfo;
    console.log(email);
    // const res = await filmAPI.addLikeFilmTo();
  }
);

export const updateFavorites = createAsyncThunk(
  'film/favorites',
  async (id, thunkAPI) => {}
);

export const fetchLikes = createAsyncThunk();
export const fetchFavorites = createAsyncThunk();

export default filmSlide.reducer;
