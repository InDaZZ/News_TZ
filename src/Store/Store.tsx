import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as newsReucer } from "./Slices/News";
const reducers = combineReducers({
  News: newsReucer,
});
export const store = configureStore({
  reducer: reducers,
});
