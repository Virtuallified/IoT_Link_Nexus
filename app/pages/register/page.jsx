"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/utils/authUtils";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  const dispatch = useDispatch();

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleRegister = (values) => {
    dispatch(registerUser(values));
  };

  return user ? (
    "" // TODO: Fix console error: router.push("/pages/dashboard")
  ) : (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
