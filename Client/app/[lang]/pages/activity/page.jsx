import React from "react";
import ActivityPage from "../../components/ActivityPage";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import { Navigationbar } from "../../components/reusable/Navigationbar";
import { Loading, NotAuthenticated } from "../../components/reusable/Loading";

const Activity = () => {
  // Determine the authentication state and whether the authentication process is still loading.
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <NotAuthenticated />;
  }

  return (
    <>
      <Navigationbar />
      <ActivityPage />
    </>
  );
};

export default Activity;
