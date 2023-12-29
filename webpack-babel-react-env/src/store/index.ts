import { configureStore } from "@reduxjs/toolkit";
import { useSelector as rawUseSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import userReducer from "./users";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export type AppDispatch = typeof store.dispatch;

export default store;
