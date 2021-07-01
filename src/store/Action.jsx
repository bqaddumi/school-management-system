import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  isError: false,
};

const authSlice = createSlice({
  name: "AUTHENTICATION",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state,) {
      state.isAuthenticated = false;
    },
    errorMsg(state,action) {
      state.isError = action.payload.error;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
