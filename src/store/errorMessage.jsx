import { createSlice } from "@reduxjs/toolkit";

const initialErrorMessageState = {
  isError: false
};

const errorMessageSlice = createSlice({
  name: "ERRORMESSAGE",
  initialState: initialErrorMessageState,
  reducers: {
    errorMsg(state, action) {
      state.isError = action.payload;
    }
  },
});

export const errorMessageActions = errorMessageSlice.actions;
export default errorMessageSlice.reducer;
