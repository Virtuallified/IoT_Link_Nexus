import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  sendEmailVerification,
  updatePassword,
  deleteUser,
  signOut as authSignOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import { clearUser } from "../redux/slices/userSlice"; // Import your Firebase configuration

// ** Use the checkUserAuth function to check the authentication status and handle the callback
export const checkUserAuth = (callback) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    callback(user);
    unsubscribe(); // Unsubscribe after the initial check
  });
};

export const useAuthState = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const clear = () => {
    setUser(null);
    setLoading(false);
    // Delete data from the redis database
    user?.uid &&
      fetch(`/api/redis?uid=${user?.uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "en",
        },
      });
  };

  // Signout
  const signOut = () => {
    authSignOut(auth)
      .then(() => {
        // ! Sign-out successful.
        // Dispatch action to clear user data
        dispatch(clearUser());
        clear();
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(true);
      if (!authUser && !user) {
        clear();
        return;
      }
      setUser(authUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading, signOut };
};

// Update a user's profile
// export const updateUserProfile = async (...updatedDetails) => {
//   // !Error: React Hook "useAuthState" is called in function "updateUserProfile" that is neither a React function component nor a custom React Hook function.
//   const { user } = useAuthState();
//   const { displayName, email, phoneNumber, photoURL } = updatedDetails;
//   try {
//     await updateProfile(user, {
//       displayName,
//       email,
//       phoneNumber,
//       photoURL,
//     }).then(() => {
//       console.log("Profile updated successfully");
//     });
//     // You can return a success message or any other data here if needed
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     throw error; // You can re-throw the error to handle it elsewhere
//   }
// };

// Set a user's email address
export const updateUserEmail = async (newEmail) => {
  try {
    await updateEmail(user, newEmail).then(() => {
      console.log("Email updated successfully");
    });
    // You can return a success message or any other data here if needed
  } catch (error) {
    console.error("Error updating email:", error);
    throw error; // You can re-throw the error to handle it elsewhere
  }
};

// Set a user's password
export const updateUserPassword = async (newPassword) => {
  try {
    await updatePassword(user, newPassword).then(() => {
      console.log("Password updated successfully");
    });
    // You can return a success message or any other data here if needed
  } catch (error) {
    console.error("Error updating password:", error);
    throw error; // You can re-throw the error to handle it elsewhere
  }
};

// Delete a user
export const deleteTheUser = async (userObj) => {
  try {
    await deleteUser(userObj).then(() => {
      console.log("User deleted successfully");
    });
    // You can return a success message or any other data here if needed
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // You can re-throw the error to handle it elsewhere
  }
};
