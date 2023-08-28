import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      // Handle registration logic, update state, etc.
    },
    // Other auth-related reducers
  },
});

export const { registerUser } = authSlice.actions;
export default authSlice.reducer;
