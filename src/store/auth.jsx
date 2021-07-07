import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialAuthState = {
  userToken: Cookies.get('userToken'),
  role: '',
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
      Cookies.remove(action.payload);
      state.userToken = Cookies.get('userToken');
    },
    setRole(state, action) {
      state.role = action.payload;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
