"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "@/app/[lang]/utils/authUtils";
import {
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

  useEffect(() => {
    const trimmedPath = pathname.replace(/^\/pages\//, "");
    // Get the element by its id
    let element = document.getElementById(trimmedPath);
    // Check if the element exists
    if (element) {
      // Modify attribute to the element
      element.removeAttribute("color");
      element.setAttribute("aria-current", "page");
    }
    return () => {
      // Modify attribute to the element
      element.removeAttribute("aria-current");
      element.setAttribute("color", "foreground");
    };
  }, []);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <Logo /> */}
          <p className="font-bold text-inherit">IoT Link Nexus</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link id="dashboard" href="/pages/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link id="activity" href="/pages/activity" color="foreground">
            Activity
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link id="profile" href="/pages/profile" color="foreground">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="#">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="#" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
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
              href="#"
              size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
