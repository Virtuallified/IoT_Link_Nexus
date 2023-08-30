import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./redux/provider";

// UI/UX Styling

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IoT Link Nexus",
  description: "NextJS-IoT-Firebase-CRUD-API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
