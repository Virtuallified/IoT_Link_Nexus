import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";
import { ThemeProvider } from "./utils/ThemeProvider";
import "../i18n";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IoT Link Nexus",
  description: "NextJS-IoT-Firebase-CRUD-API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} dark text-foreground bg-background`}> */}
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
