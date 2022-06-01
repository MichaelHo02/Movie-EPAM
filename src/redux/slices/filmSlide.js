import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';
import tvShowsAPI from '../../api/services/tvShowsAPI';
import { getSignUpEmail, getSignUpUsername } from '../selectors';

const filmSlide = createSlice({
  name: 'film',
  initialState: {
    status: 'idle',
    data: {
      likesId: {},
      likes: [],
      favoritesId: {},
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
        state.status = 'fulfilled';
        state.data.likes = action.payload;
        const json = {};
        action.payload.forEach(({ id }) => (json[id] = true));
        state.data.likesId = json;
      })
      .addCase(fetchLikesAndFavorites.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchLikesAndFavorites.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.likes = action.payload.likes;
        const jsonLikes = {};
        action.payload.likes.forEach(({ id }) => (jsonLikes[id] = true));
        state.data.likesId = jsonLikes;
      });
  },
});

export const { setLikes, setFavorites } = filmSlide.actions;

export const updateLikes = createAsyncThunk(
  'film/likes',
  async ({ id, variant }, thunkAPI) => {
    let film = await (variant === 'tv' ? tvShowsAPI.getTvShow(id) : null);
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await filmAPI.addLikeFilmTo(film.data, {
      name: name,
      variant: variant,
      type: 'like',
    });
    return res.data;
  }
);

export const removeLikes = createAsyncThunk(
  'film/unlinkes',
  async ({ id, variant }, thunkAPI) => {
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await filmAPI.removeLikeFilmFrom(id, {
      name: name,
      variant: variant,
      type: 'like',
    });
    return res.data;
  }
);

export const updateFavorites = createAsyncThunk(
  'film/favorites',
  async (id, thunkAPI) => {}
);

export const fetchLikesAndFavorites = createAsyncThunk(
  'film/fetchLikesAndFavorites',
  async (param, thunkAPI) => {
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await filmAPI.getFilms({ name });
    return res.data;
  }
);

export const fetchLikes = createAsyncThunk();
export const fetchFavorites = createAsyncThunk();

export default filmSlide.reducer;
