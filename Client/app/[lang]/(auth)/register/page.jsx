"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import RegisterForm from "../../components/RegisterForm";
import { Loading } from "../../components/reusable/Loading";
import { Navigationbar } from "../../components/reusable/Navigationbar";
import { Footer } from "../../components/reusable/Footer";

const RegisterPage = (req) => {
  const dispatch = useDispatch();

  // Determine the authentication state and whether the authentication process is still loading.
  const router = useRouter();
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading />;
  }

  const handleRegister = (values) => {
    dispatch(registerUser(values));
  };

  return user && !isLoading ? (
    router.push("/pages/dashboard") // TODO: Fix console error
  ) : (
    <>
      <Navigationbar />
      <RegisterForm onSubmit={handleRegister} lang={req.params.lang} />
      <Footer />
    </>
  );
};

export default RegisterPage;
