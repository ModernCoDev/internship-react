import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
  },
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
  
    logout(state) {
      auth.signOut();
    },
  },
});


export const authActions = authSlice.actions;

export default authSlice;
