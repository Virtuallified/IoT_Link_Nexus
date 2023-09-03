"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/utils/authUtils"; // Import the useAuthState hook
import ProfileForm from "../../components/ProfileForm";

const ProfilePage = () => {
  // Get user from state and update to global redux store
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state?.user);

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <>
        <div>Not authenticated.</div>
        {setTimeout(() => router.push("/pages/login"), 2000)}
      </>
    );
  }

  const handleUpdate = (values) => {
    dispatch(updateUser({ uid: userProfile.uid, values }));
  };

  return (
    <div>
      <h2>Profile</h2>
      <ProfileForm initialValues={userProfile} onSubmit={handleUpdate} />
    </div>
  );
};

export default ProfilePage;
