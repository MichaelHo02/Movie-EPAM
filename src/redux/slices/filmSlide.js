import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';
import tvShowsAPI from '../../api/services/tvShowsAPI';
import { getSignUpEmail, getSignUpUsername } from '../selectors';

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
    let film = await (variant === 'tv' ? tvShowsAPI.getTvShow(id) : null);
    console.log(film.data);
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = getSignUpUsername(thunkAPI.getState());
    console.log(name);
    const res = await filmAPI.addLikeFilmTo(film.data, {
      name: name,
      variant: variant,
      type: 'like',
    });
  }
);

export const updateFavorites = createAsyncThunk(
  'film/favorites',
  async (id, thunkAPI) => {}
);

export const fetchLikes = createAsyncThunk();
export const fetchFavorites = createAsyncThunk();

export default filmSlide.reducer;
