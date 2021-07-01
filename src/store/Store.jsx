import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Action";

const store = configureStore({
  reducer: { auth: reducer, error: reducer,  loader: reducer},
});

export default store;
