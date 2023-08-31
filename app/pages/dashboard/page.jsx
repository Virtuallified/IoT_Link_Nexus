"use client";

import React from "react";
import Dashboard from "../../components/Dashboard";
import { useAuthState } from "@/app/lib/authUtils"; // Import the useAuthState hook

const DashboardPage = () => {
  // Determine the authentication state and whether the authentication process is still loading.
  const { user, isLoading } = useAuthState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authenticated.</div>;
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
