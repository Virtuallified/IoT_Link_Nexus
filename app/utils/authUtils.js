import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
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
  };

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setLoading(true);
      if (!authUser) {
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
