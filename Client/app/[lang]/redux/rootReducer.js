"use client";

import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";

const rootReducer = combineReducers({
  form: formReducer, // include formReducer in the combineReducers call to make redux-form work properly
  user: userReducer,
  toast: toastReducer, // Show alerts
});

export default rootReducer;
