"use client";

import React from "react";
import { Provider } from "react-redux";
// Redux-persist configuration
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store"; // Make sure this import is correct

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
