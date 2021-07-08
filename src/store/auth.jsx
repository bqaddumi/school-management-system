import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialAuthState = {
  userToken: Cookies.get('userToken'),
  currentUserRole: '',
  userRole: '',
};

const authSlice = createSlice({
  name: "AUTHENTICATION",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      Cookies.set('userToken', action.payload, { expires: new Date(Date.now() + (18000000)) });
      state.userToken = action.payload;
    },
    logout(state, action) {
      state.currentUserRole = ''
      Cookies.remove(action.payload);
      state.userToken = Cookies.get('userToken');
    },
    setCurrentUserRole(state, action) {
      state.currentUserRole = action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
