import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./shopSlice";

export const store = configureStore({
  reducer: {
    shops: shopReducer,
  },
});

export type TStore = ReturnType<typeof store.getState>;
