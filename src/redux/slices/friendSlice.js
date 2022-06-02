import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/services/userAPI';
import { getSignUpUsername } from '../selectors';

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    status: 'idle',
    data: {
      users: [],
      friends: [],
      friendsName: {},
      page: 1,
    },
    response: {
      success: null,
      message: '',
    },
  },
  reducers: {
    clearData: (state, data) => {
      state.data.users = [];
      state.data.friends = [];
      state.data.friendsName = {};
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
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.users = action.payload.users;
        state.data.friends = action.payload.friends;
        const jsonFriends = {};
        action.payload.friends.forEach(
          friend => (jsonFriends[friend.username] = true)
        );
        state.data.friendsName = jsonFriends;
      })
      .addCase(addFriends.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(addFriends.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.friends = action.payload;
        const jsonFriends = {};
        action.payload.forEach(friend => (jsonFriends[friend.username] = true));
        state.data.friendsName = jsonFriends;
      })
      .addCase(removeFriends.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(removeFriends.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.friends = action.payload;
        const jsonFriends = {};
        action.payload.forEach(friend => (jsonFriends[friend.username] = true));
        state.data.friendsName = jsonFriends;
      });
  },
});

export const { incrementPage, decrementPage } = friendSlice.actions;

export const fetchUsers = createAsyncThunk(
  'friend/users',
  async (username, thunkAPI) => {
    const name = getSignUpUsername(thunkAPI.getState());
    const res = await userAPI.users({ username, name });
    return res.data;
  }
);

export const addFriends = createAsyncThunk(
  'friend/add',
  async ({ friend }, thunkAPI) => {
    const me = getSignUpUsername(thunkAPI.getState());
    const res = await userAPI.addFriends({ me, friend });
    return res.data;
  }
);

export const removeFriends = createAsyncThunk(
  'friend/remove',
  async ({ friend }, thunkAPI) => {
    const me = getSignUpUsername(thunkAPI.getState());
    const res = await userAPI.removeFriends({ me, friend });
    return res.data;
  }
);

export default friendSlice.reducer;
