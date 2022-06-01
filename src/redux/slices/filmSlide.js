import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';
import moviesAPI from '../../api/services/movieAPI';
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
      .addCase(updateFavorites.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.favorites = action.payload;
        const json = {};
        action.payload.forEach(({ id }) => (json[id] = true));
        state.data.favoritesId = json;
      })
      .addCase(fetchLikesAndFavorites.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchLikesAndFavorites.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.likes = action.payload.likes;
        state.data.favorites = action.payload.favorites;
        const jsonLikes = {};
        action.payload.likes.forEach(({ id }) => (jsonLikes[id] = true));
        state.data.likesId = jsonLikes;
        const jsonFavorites = {};
        action.payload.favorites.forEach(
          ({ id }) => (jsonFavorites[id] = true)
        );
        state.data.favoritesId = jsonFavorites;
      })
      .addCase(removeLikes.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(removeLikes.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.likes = action.payload.likes;
      })
      .addCase(removeFavorites.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(removeFavorites.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.favorites = action.payload.favorites;
      });
  },
});

export const { setLikes, setFavorites } = filmSlide.actions;

export const updateLikes = createAsyncThunk(
  'film/likes',
  async ({ id, variant }, thunkAPI) => {
    let film = await (variant === 'tv'
      ? tvShowsAPI.getTvShow(id)
      : moviesAPI.getMovie(id));
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = getSignUpUsername(thunkAPI.getState());
    console.log('first');
    const res = await filmAPI.addLikeFilmTo(
      { ...film.data, name: film.data.title },
      {
        name: name,
        variant: variant,
        type: 'like',
      }
    );
    console.log('seconds');

    console.log('[res]', res.data);
    return res.data;
  }
);

export const removeLikes = createAsyncThunk(
  'film/unlikes',
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
  async ({ id, variant }, thunkAPI) => {
    let film = await (variant === 'tv'
      ? tvShowsAPI.getTvShow(id)
      : moviesAPI.getMovie(id));
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await filmAPI.addLikeFilmTo(
      { ...film.data, name: film.data.title },
      {
        name: name,
        variant: variant,
        type: 'favorite',
      }
    );
    return res.data;
  }
);

export const removeFavorites = createAsyncThunk(
  'film/unfavorites',
  async ({ id, variant }, thunkAPI) => {
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await filmAPI.removeLikeFilmFrom(id, {
      name: name,
      variant: variant,
      type: 'favorite',
    });
    return res.data;
  }
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
