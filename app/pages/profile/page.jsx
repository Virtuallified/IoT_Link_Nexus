"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import ProfileForm from "../../components/ProfileForm";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleUpdate = (values) => {
    dispatch(updateUser({ uid: user.uid, values }));
  };

  return (
    <div>
      <h2>Profile</h2>
      <ProfileForm initialValues={user} onSubmit={handleUpdate} />
    </div>
  );
};

export default ProfilePage;
