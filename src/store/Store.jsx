import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import loadingReducer from "./loading";
import toastReducer from "./notification";

const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loadingReducer,
    toast: toastReducer,
  },
});

export default store;
