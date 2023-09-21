"use client";

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { default as rootSlice } from "./rootReducer";
import logger from "redux-logger";
// import persistedRedisStorage from "../libs/persistedRedisStorage";
// import persistedFirebaseStorage from "../libs/persistedFirebaseStorage";

const persistConfig = {
  key: "root",
  version: 1,
  storage, // Use Browser App - localStorage
  // storage: persistedRedisStorage, // Use Redis storage
  // storage: persistedFirebaseStorage, // Use Firebase storage
};

/* Added Redux-Persist support */
// Redux state should persist across page refreshes, and will be restored from local storage on page reloads
const persistedReducer = persistReducer(persistConfig, rootSlice);

// Create the Redux store using configureStore from @reduxjs/toolkit
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        //Non-Serializable Data: should not put non-serializable values in state or actions.
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export const persistor = persistStore(store);
