"use client";

import { configureStore } from "@reduxjs/toolkit";
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";

// Create the Redux store using configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: rootSlice,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on
