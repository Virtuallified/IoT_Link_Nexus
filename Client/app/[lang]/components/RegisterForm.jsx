"use client";

import React from "react";
import { Field, reduxForm } from "redux-form";
import { useRouter } from "next/navigation";
import { BlurTop } from "./reusable/BlurBack";

/* Validation */
const required = (value) => (value ? undefined : "Required");
const emailValidator = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
    ? undefined
    : "Invalid email address";
const minLength8 = (value) =>
  value && value.length < 8 ? "Must be at least 8 characters" : undefined;

const RegisterForm = ({ handleSubmit }) => {
  const router = useRouter();
  const handleNavigate = (path = "#") => router.push(path);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <BlurTop />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/iot-logo.png"
            alt="IoT Link Nexus"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Field
                  component="input"
                  validate={[required, emailValidator]}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="px-4 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Field
                  component="input"
                  validate={[required, minLength8]}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="px-4 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              onClick={() => handleNavigate("/login")}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">
              ➟ Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "register",
  enableReinitialize: true, // enable form values to be updated
})(RegisterForm);
