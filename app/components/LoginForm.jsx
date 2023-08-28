import React from "react";
import { Field, reduxForm } from "redux-form";

const required = (value) => (value ? undefined : "This field is required");
const emailValidator = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? undefined
    : "Invalid email address";

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <Field
          name="email"
          component="input"
          type="email"
          validate={[required, emailValidator]}
        />
      </div>
      <div>
        <label>Password</label>
        <Field
          name="password"
          component="input"
          type="password"
          validate={required}
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "login",
  enableReinitialize: true, // enable form values to be updated
})(LoginForm);
