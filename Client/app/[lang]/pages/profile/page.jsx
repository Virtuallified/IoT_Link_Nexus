"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { updateUserProfile, useAuthState } from "@/app/[lang]/utils/authUtils"; // Import the useAuthState hook
import ProfileForm from "../../components/ProfileForm";
import { Loading, NotAuthenticated } from "../../components/reusable/Loading";
import { Navigationbar } from "../../components/reusable/Navigationbar";
import { Footer } from "../../components/reusable/Footer";
import { dataSanitizer } from "../../api/firestore/user/route";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state?.user);
  // Determine the authentication state and whether the authentication process is still loading.
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <NotAuthenticated />;
  }

  const handleUpdate = (values) => {
    // Update the document with the new data in FIRE AUTH
    const updatedProperties = dataSanitizer(userProfile, values);
    // TODO: updateUserProfile(updatedProperties);
    // Update redux store and Firestore
    dispatch(updateUser({ uid: userProfile.uid, userProfile, values }));
  };

  // Fetch redis cache value for user profile
  const getUserFromRedisCache = async (uid) => {
    try {
      // Fetch data from the redis database
      const response = await fetch(`/api/redis?uid=${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "accept-language": "en",
        },
      });

      if (!response.ok) {
        // Handle non-OK responses here, e.g., throw an error or return a default value
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Read and parse the JSON data from the response
      const data = await response.json();
      return data;
    } catch (error) {
      // Handle any errors that may occur during the fetch
      console.error("Error fetching data:", error);
      throw error; // You can choose to handle the error differently if needed
    }
  };

  // const userObj = getUserFromRedisCache("4L5mzvh8qjcyAtp6bbQvEeHkSFo2"); //getUserFromRedisCache(userProfile.uid);

  return (
    <>
      <Navigationbar />
      <ProfileForm
        uid={userProfile.uid}
        getUserFromRedisCache={getUserFromRedisCache}
        onSubmit={handleUpdate}
      />
      <Footer />
    </>
  );
};

export default ProfilePage;
