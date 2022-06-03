import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';
import moviesAPI from '../../api/services/movieAPI';
import tvShowsAPI from '../../api/services/tvShowsAPI';
import { getSignUpUsername } from '../selectors';

const filmSlice = createSlice({
  name: 'film',
  initialState: {
    status: 'idle',
    data: {
      likesId: {},
      likes: [],
      favoritesId: {},
      favorites: [],
      page: 1,
      film: {},
    },
  },
  reducers: {
    clearData: (state, action) => {
      state.data.likesId = {};
      state.data.likes = [];
      state.data.favoritesId = {};
      state.data.favorites = [];
      state.data.page = 1;
    },
    setLikes: (state, action) => {
      state.data.likes = [...state.data.like, action.payload];
    },
    setFavorites: (state, action) => {
      state.data.favorites = [...state.data.favorites, action.payload];
    },
    incrementPage: (state, action) => {
      const length = action.payload;
      const nextPage = state.data.page + 1;
      state.data.page = nextPage <= length ? nextPage : state.data.page;
    },
    decrementPage: (state, action) => {
      const nextPage = state.data.page - 1;
      state.data.page = nextPage > 0 ? nextPage : state.data.page;
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
      })
      .addCase(fetchTV.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchTV.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.film = action.payload;
      })
      .addCase(fetchMovie.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.film = action.payload;
      });
  },
});

export const {
  clearData,
  setLikes,
  setFavorites,
  incrementPage,
  decrementPage,
} = filmSlice.actions;

export const updateLikes = createAsyncThunk(
  'film/likes',
  async ({ id, variant }, thunkAPI) => {
    let film = await (variant === 'tv'
      ? tvShowsAPI.getTvShow(id)
      : moviesAPI.getMovie(id));
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const username = getSignUpUsername(thunkAPI.getState());
    console.log('first');
    const name = variant === 'tv' ? film.data.name : film.data.title;
    const res = await filmAPI.addLikeFilmTo(
      { ...film.data, name, variant },
      {
        name: username,
        variant: variant,
        type: 'like',
      }
    );

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
    const username = getSignUpUsername(thunkAPI.getState());
    const name = variant === 'tv' ? film.data.name : film.data.title;
    const date =
      variant === 'tv' ? film.data.first_air_date : film.data.release_date;
    const country =
      variant === 'tv' ? film.data.origin_country : film.data.original_language;

    const res = await filmAPI.addLikeFilmTo(
      { ...film.data, name, date, variant, country },
      {
        name: username,
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

export const fetchMovie = createAsyncThunk(
  'film/fetchMovie',
  async (id, thunkAPI) => {
    let film = await moviesAPI.getMovie(id);
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = film.data.name;
    const res = { ...film.data, name, variant: 'tv' };
    return res;
  }
);

export const fetchTV = createAsyncThunk(
  'film/fetchTV',
  async (id, thunkAPI) => {
    console.log(id);
    let film = await tvShowsAPI.getTvShow(id);
    const genres = film.data.genres.map(genre => genre.name);
    film.data = { ...film.data, genres };
    const name = film.data.name;
    const res = { ...film.data, name, variant: 'tv' };
    return res;
  }
);

export default filmSlice.reducer;
