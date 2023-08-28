import { createSlice } from "@reduxjs/toolkit";
import { auth } from "@/firebase/firebase.config";
import bcrypt from "bcryptjs";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: (state) => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

const saltRounds = 10;

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error) {
      console.error(error.message);
    }
  };

export const registerUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        hashedPassword
      );
      dispatch(setUser(userCredential.user));
    } catch (error) {
      console.error(error.message);
    }
  };

// ... (same as before)

export const updateUser =
  ({ uid, values }) =>
  async (dispatch) => {
    try {
      // Update the user data in Firebase or your database
      // You might want to customize this part based on your backend setup
      // For example, you can use Firestore to update user data

      // Dispatch the updated user data
      dispatch(setUser(values));
    } catch (error) {
      console.error(error.message);
    }
  };

export default userSlice.reducer;
