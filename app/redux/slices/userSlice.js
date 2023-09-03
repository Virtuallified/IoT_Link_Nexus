import { createSlice } from "@reduxjs/toolkit";
import { auth } from "@/firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// import bcrypt from "bcryptjs";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: "",
    displayName: "",
    email: "",
    photoURL: "",
  }, // Initial state should be null or an empty object
  reducers: {
    setUser: (state, action) => {
      // Extract and store only the serializable properties from the user object
      const { uid, displayName, email, photoURL } = action.payload;
      return { uid, displayName, email, photoURL };
    },
    clearUser: (state) => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

const saltRounds = 10;

export const loginUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
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
      // * Hash password if you're saving it into a general db via sql/nosql
      // const hashedPassword = await bcrypt.hash(password, saltRounds);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error) {
      console.error(error.message);
    }
  };

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
