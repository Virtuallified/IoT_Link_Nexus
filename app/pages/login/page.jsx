"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/utils/authUtils";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  return user ? (
    "" // TODO: Fix console error: router.push("/pages/dashboard")
  ) : (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
