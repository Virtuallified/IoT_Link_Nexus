"use client";

import React from "react";
import Dashboard from "../../components/Dashboard";
import { useAuthState } from "@/app/[lang]/utils/authUtils"; // Import the useAuthState hook
import { Navigationbar } from "../../components/reusable/Navigationbar";
import { Loading, NotAuthenticated } from "../../components/reusable/Loading";

const DashboardPage = () => {
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
      <Dashboard />
    </>
  );
};

export default DashboardPage;
