import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Action";

const store = configureStore({
  reducer: { auth: authReducer ,error:authReducer},
});

export default store;
