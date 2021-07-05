import { createSlice } from "@reduxjs/toolkit";

const initialToastState = {
  message: "",
  position: "",
  type: "",
};

const toastSlice = createSlice({
  name: "TOAST",
  initialState: initialToastState,
  reducers: {
    toast(state, action) {
      state.message = action.payload.message;
      state.position = action.payload.position;
      state.type = action.payload.type;
    },
  },
});

export const toastActions = toastSlice.actions;
export default toastSlice.reducer;
