import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/slices/userSlice";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    dispatch(loginUser(values));
  };

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;
