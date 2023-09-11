"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import LoginForm from "../../components/LoginForm";
import { Loading } from "../../components/reusable/Loading";

const LoginPage = () => {
  const dispatch = useDispatch();

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading />;
  }

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  return user && !isLoading ? (
    router.push("/pages/dashboard") // TODO: Fix console error
  ) : (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
