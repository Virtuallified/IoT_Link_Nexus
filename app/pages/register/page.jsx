"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/userSlice";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  const dispatch = useDispatch();

  const handleRegister = (values) => {
    dispatch(registerUser(values));
  };

  return (
    <div>
      <h2>Register</h2>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default RegisterPage;
