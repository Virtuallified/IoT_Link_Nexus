import React from "react";
import { Field, reduxForm, initialize } from "redux-form";
import { BlurBottom } from "./reusable/BlurBack";
import { Chip } from "@nextui-org/react";
import { getTranslation } from "../utils/translateUtils";
import { defaultTranslation } from "../constants/translationKey.constant";

const ProfileForm = ({
  handleSubmit,
  dispatch,
  uid,
  getUserFromRedisCache,
  ...props
}) => {
  let user;
  const loadLocale = getTranslation(props.lang);
  const timestamp = "1695412816016"; // Assuming this is your timestamp as a string
  const date = new Date(parseInt(timestamp, 10)); // Parse the timestamp and create a Date object

  // Format the date as a string (adjust the format as needed)
  const formattedDate = date.toLocaleString(); // This will give you a human-readable date and time

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        user = await getUserFromRedisCache(uid);
        // Initialize the form with the initial value
        dispatch(
          initialize("profile", {
            displayName: user?.providerData[0].displayName,
            email: user?.providerData[0].email,
            phoneNumber: user?.providerData[0].phoneNumber,
            photoURL: user?.providerData[0].photoURL,
          })
        );
      } catch (error) {
        // Handle errors if needed
        console.error("Error while fetching user data:", error);
      }
    };

    fetchUserData(); // Call the async function immediately
  }, []);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:mx-auto lg:px-8">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {loadLocale?.iotNexus?.profile.title ||
              defaultTranslation.iotNexus?.profile.title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {loadLocale?.iotNexus?.profile.disclaimer ||
              defaultTranslation.iotNexus?.profile.disclaimer}
            <Chip variant="flat" color="secondary" className="ml-2">
              {`Last Login At: ${formattedDate}`}
            </Chip>
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="displayName"
                className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <Field
                  component="input"
                  type="text"
                  name="displayName"
                  id="displayName"
                  autoComplete="displayName"
                  placeholder={"Test User"}
                  className="px-4 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-6 text-gray-900">
                Mobile
              </label>
              <div className="mt-2">
                <Field
                  component="input"
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="phoneNumber"
                  placeholder={
                    !user?.providerData[0].phoneNumber && "98xxxxxx37"
                  }
                  className="px-4 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Field
                  component="input"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={
                    !user?.providerData[0].email && "example@iotlinknexus.com"
                  }
                  className="px-4 py-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="photoURL"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="photoURL"
                        name="photoURL"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
      <BlurBottom />
    </div>
  );
};

export default reduxForm({ form: "profile" })(ProfileForm);
