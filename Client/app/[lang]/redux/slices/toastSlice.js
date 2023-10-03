import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    show: false,
    /* Not required here. Please refer TravelGuide_OpenAI repo to see full use of it. */
    // delay: 3000,
    // autohide: true,
    title: "",
    message: "",
    type: "default",
  },
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideToast: (state) => {
      state.show = false;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
