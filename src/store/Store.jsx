import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./Action";

const store = configureStore({
  reducer: { auth: Reducer, error: Reducer },
});

export default store;
