import { createSlice } from "@reduxjs/toolkit";

const initialLoadingState = {
  isLoading: false,
  isLoadingAdmin: false,
};

const loadingSlice = createSlice({
  name: "LOADING",
  initialState: initialLoadingState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsLoadingAdmin(state, action) {
      state.isLoadingAdmin = action.payload;
    },
  },
});

export const loadingActions = loadingSlice.actions;
export default loadingSlice.reducer;
