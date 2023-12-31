"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import LoginForm from "../../components/LoginForm";
import { Loading } from "../../components/reusable/Loading";
import { Navigationbar } from "../../components/reusable/Navigationbar";
import { Footer } from "../../components/reusable/Footer";
import { showToast } from "../../redux/slices/toastSlice";

const LoginPage = (req) => {
  const dispatch = useDispatch();

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading />;
  }

  const handleLogin = (values) => {
    dispatch(loginUser(values));
    dispatch(
      showToast({
        type: "success",
        title: "Successful",
        message: "Login",
      })
    );
  };

  return user && !isLoading ? (
    router.push("/pages/dashboard") // TODO: Fix console error
  ) : (
    <>
      <Navigationbar />
      <LoginForm onSubmit={handleLogin} lang={req.params.lang} />
      <Footer />
    </>
  );
};

export default LoginPage;
