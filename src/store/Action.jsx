import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isError: false,
};

const slice = createSlice({
  name: "AUTHENTICATION",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    errorMsg(state, action) {
      state.isError = action.payload.error;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
