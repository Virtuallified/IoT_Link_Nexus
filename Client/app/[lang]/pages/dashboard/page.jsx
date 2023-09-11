"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/app/[lang]/utils/authUtils"; // Import the useAuthState hook
import Dashboard from "../../components/Dashboard";
import { Navigationbar } from "../../components/reusable/Navigationbar";

const DashboardPage = () => {
  // Determine the authentication state and whether the authentication process is still loading.
  const { user, isLoading } = useAuthState();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    setTimeout(() => router.push("/login"), 2000);
    return <div>Not authenticated.</div>;
  }

  return (
    <>
      <Navigationbar />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
