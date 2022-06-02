import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/services/userAPI';

const friendSlice = createSlice({
  name: 'friend',
  initialState: {
    status: 'idle',
    data: {
      users: [],
      friends: [],
    },
    response: {
      success: null,
      message: '',
    },
  },
  reducer: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.users = action.payload;
      });
  },
});

export const fetchUsers = createAsyncThunk(
  'friend/users',
  async (username, thunkAPI) => {
    const res = await userAPI.users({ username });
    return res.data;
  }
);

export default friendSlice.reducer;
