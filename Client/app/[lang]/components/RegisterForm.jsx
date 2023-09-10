"use client";

import React from "react";
import { Field, reduxForm } from "redux-form";

const required = (value) => (value ? undefined : "Required");
const emailValidator = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ? undefined
    : "Invalid email address";
const minLength8 = (value) =>
  value && value.length < 8 ? "Must be at least 8 characters" : undefined;

const RegisterForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <Field
          name="email"
          component="input"
          type="email"
          validate={[required, emailValidator]}
        />
      </div>
      <div>
        <label>Password:</label>
        <Field
          name="password"
          component="input"
          type="password"
          validate={[required, minLength8]}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default reduxForm({
  form: "register",
  enableReinitialize: true, // enable form values to be updated
})(RegisterForm);
