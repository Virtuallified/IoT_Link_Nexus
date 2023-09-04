"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Portal,
  Tooltip,
  Text,
  Dialog,
  Button,
  Card,
  Avatar,
} from "@radix-ui/themes";
import { useAuthState } from "@/app/utils/authUtils";

const Navbar = () => {
  // Get user from state and update to global redux store
  const user = useSelector((state) => state?.user);
  const router = useRouter();
  const { signOut } = useAuthState();

  const handleLogout = () => {
    signOut();
    // Redirect to login page
    router.push("/pages/login");
  };

  return (
    <div>
      <Tooltip content="User Profile">
        <Button>
          <Avatar src={user?.profileImage} alt="User Avatar" fallback="S" />
        </Button>
      </Tooltip>
      <Tooltip content="Dashboard">
        <Button onClick={() => router.push("/pages/dashboard")}>
          {/* <DashboardIcon /> */}
        </Button>
      </Tooltip>
      <Tooltip content="Logout">
        <Button onClick={handleLogout}>{/* <LogoutIcon /> */}</Button>
      </Tooltip>
    </div>
  );
};

export default Navbar;
