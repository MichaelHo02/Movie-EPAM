import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from '../../api/services/userAPI';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    data: {
      username: '',
      email: '',
      password: '',
    },
    response: {
      success: null,
      message: '',
    },
  },
  reducers: {
    clearUser: (state, action) => {
      state.status = 'idle';
      state.data.username = '';
      state.data.email = '';
      state.data.password = '';
      state.response.success = null;
      state.response.message = '';
    },
    createUser: (state, action) => {
      state.status = 'idle';
      state.data = action.payload;
    },
    updateUsername: (state, action) => {
      state.data.username = action.payload;
    },
    updateEmail: (state, action) => {
      state.data.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.data.password = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'idle';
        state.response = action.payload.response;
        state.data = action.payload.data;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(login.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.response = action.payload.response;
        if (action.payload.data) {
          state.data = action.payload.data;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const {
  clearUser,
  createUser,
  updateUsername,
  updateEmail,
  updatePassword,
} = authSlice.actions;

export const register = createAsyncThunk('auth/register', async user => {
  const res = await userAPI.register(JSON.stringify(user));
  return {
    response: res.data,
    data: { ...user },
  };
});

export const login = createAsyncThunk('auth/login', async user => {
  const res = await userAPI.login(user);
  return res.data;
});

export default authSlice.reducer;
