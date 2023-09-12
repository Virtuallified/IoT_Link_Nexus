import { createSlice } from "@reduxjs/toolkit";
import { auth } from "@/firebase/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  createUserRecord,
  updateUserRecord,
} from "../../api/firestore/user/route";
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
      const {
        uid,
        displayName,
        email,
        phoneNumber,
        photoURL,
        isAnonymous,
        metadata,
      } = action.payload;
      return {
        uid,
        displayName,
        email,
        phoneNumber,
        photoURL,
        isAnonymous,
        createdAt: metadata.creationTime,
        lastLoginAt: metadata.lastSignInTime,
      };
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
      dispatch(createUser(userCredential.user));
    } catch (error) {
      console.error(error.message);
    }
  };

export const updateUser =
  ({ uid, values }) =>
  async (dispatch) => {
    try {
      updateUserRecord(uid, values)
        .then((updatedUser) => {
          console.log("User details updated:", updatedUser);
        })
        .catch((error) => {
          console.error("Failed to update user details:", error);
        });

      // Dispatch the updated user data
      dispatch(setUser(values));
    } catch (error) {
      console.error(error.message);
    }
  };

const createUser = (values) => async (dispatch) => {
  try {
    // Create the user data in Firebase firestore
    await createUserRecord(values);
  } catch (error) {
    console.error(error.message);
  }
};

export default userSlice.reducer;
