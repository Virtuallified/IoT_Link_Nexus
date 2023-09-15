"use client";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";

const persistConfig = {
  key: "root",
  storage, // Can use any custom storage as needed like Firebase / Redis
};

/* Added Redux-Persist support */
// Redux state should persist across page refreshes, and will be restored from local storage on page reloads
const persistedReducer = persistReducer(persistConfig, rootSlice);

// Create the Redux store using configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export const persistor = persistStore(store);
