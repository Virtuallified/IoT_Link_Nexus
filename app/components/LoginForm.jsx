"use client";

import React from "react";
import { Field, reduxForm } from "redux-form";

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label>Password:</label>
        <Field name="password" component="input" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default reduxForm({ form: "login" })(LoginForm);
