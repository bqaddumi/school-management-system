import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import loadingReducer from './loading';
import errorMessageReducer from './errorMessage';

const store = configureStore({
  reducer: {
    auth: authReducer,
    error: errorMessageReducer,
    loader: loadingReducer
  },
});

export default store;
