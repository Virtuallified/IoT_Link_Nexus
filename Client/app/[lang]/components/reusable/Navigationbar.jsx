"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import Logo from "./Logo";
import _ from "lodash";

export const Navigationbar = () => {
  // Get user from state and update to global redux store
  const user = useSelector((state) => state?.user);
  const router = useRouter();
  const pathname = usePathname();
  const { signOut } = useAuthState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = ["Dashboard", "Activity", "Profile", "Log Out"];

  const handleLogout = () => {
    signOut();
    // Redirect to login page
    router.push("/login");
  };

  const handleNavigate = (path = "#") => router.push(path);

  useEffect(() => {
    const trimmedPath = pathname.replace(/^\/pages\//, "");
    // Get the element by its id
    let element = document.getElementById(trimmedPath);
    // TODO: Check if the element exists, active navigation menu
    // if (element) {
    //   // Modify attribute to the element
    //   element.removeAttribute("color");
    //   element.setAttribute("aria-current", "page");
    // }
    // return () => {
    //   // Modify attribute to the element
    //   element.removeAttribute("aria-current");
    //   element.setAttribute("color", "foreground");
    // };
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo
            src="/iot-logo.png" // Replace with the actual image path
            alt="Logo"
            width={64} // Specify the width (in pixels)
            height={64} // Specify the height (in pixels)
          />
          <Button
            className="bg-white hover:bg-gray-100 text-base text-gray-800 font-semibold py-2 px-4 rounded shadow"
            onClick={() => handleNavigate("/")}>
            <span className="">IoT Link Nexus</span>
          </Button>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link
            id="dashboard"
            className="hover:cursor-pointer"
            onClick={() => handleNavigate("/pages/dashboard")}>
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            id="activity"
            class="hover:cursor-pointer"
            onClick={() => handleNavigate("/pages/activity")}
            color="foreground">
            Activity
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            id="profile"
            class="hover:cursor-pointer"
            onClick={() => handleNavigate("/pages/profile")}
            color="foreground">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {_.isEmpty(user) ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link
                onClick={() => handleNavigate("/login")}
                className="hover:cursor-pointer">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                color="primary"
                variant="flat"
                onClick={() => handleNavigate("/register")}>
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <Avatar
              isBordered
              color="default"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
            <NavbarItem>
              <Button
                as={Link}
                color="danger"
                variant="flat"
                onClick={handleLogout}>
                Logout
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              size="lg"
              onClick={() => {
                item !== "Log Out"
                  ? handleNavigate(`/pages/${item.toLowerCase()}`)
                  : handleLogout();
              }}>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
