import { combineReducers } from 'redux';
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
//   toast: toastReducer,  // Show alerts
});

export default rootReducer;