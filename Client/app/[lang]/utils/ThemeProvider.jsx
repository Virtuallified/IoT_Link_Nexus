"use client";

// import `NextUIProvider` component and wrap NextUIProvider at the root of your app via providers
import { NextUIProvider } from "@nextui-org/react";

export function ThemeProvider({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
