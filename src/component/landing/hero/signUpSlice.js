import { createSlice } from '@reduxjs/toolkit';

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  reducers: {
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateLastName: (state, action) => {
      state.lastName = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { updateFirstName, updateLastName, updateEmail, updatePassword } =
  signUpSlice.actions;

export default signUpSlice.reducer;
