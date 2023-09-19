"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { updateUserProfile, useAuthState } from "@/app/[lang]/utils/authUtils"; // Import the useAuthState hook
import ProfileForm from "../../components/ProfileForm";
import { Loading, NotAuthenticated } from "../../components/reusable/Loading";
import { Navigationbar } from "../../components/reusable/Navigationbar";
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

  return (
    <div>
      <Navigationbar />
      <ProfileForm onSubmit={handleUpdate} />
    </div>
  );
};

export default ProfilePage;
