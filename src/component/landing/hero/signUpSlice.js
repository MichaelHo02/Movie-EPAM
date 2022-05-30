import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    username: '',
    email: '',
    password: '',
  },
  reducers: {
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { updateUsername, updateEmail, updatePassword } =
  signUpSlice.actions;

export default signUpSlice.reducer;
