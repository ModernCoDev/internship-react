import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: true,
    isLoggedIn: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

