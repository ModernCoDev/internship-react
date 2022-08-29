import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    loading: true
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

