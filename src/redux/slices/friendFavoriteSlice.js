import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import filmAPI from '../../api/services/filmAPI';

const friendFavoriteSlice = createSlice({
  name: 'friendFavorite',
  initialState: {
    status: 'idle',
    data: {
      favoritesId: {},
      favorites: [],
      page: 1,
    },
  },
  reducers: {
    clearData: (state, data) => {
      state.data.favoritesId = {};
      state.data.favorites = [];
      state.data.page = 1;
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
      .addCase(fetchFavoritesFriends.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchFavoritesFriends.fulfilled, (state, action) => {
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
      });
  },
});

export const { incrementPage, decrementPage, cleanData } =
  friendFavoriteSlice.actions;

export const fetchFavoritesFriends = createAsyncThunk(
  'film/fetchFavoritesFriends',
  async (name, thunkAPI) => {
    console.log(name);
    const res = await filmAPI.getFilms({ name });
    return res.data;
  }
);

export default friendFavoriteSlice.reducer;
