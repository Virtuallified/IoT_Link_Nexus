import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./redux/Provider";
import { ThemeProvider } from "../[lang]/utils/ThemeProvider";
import { defaultLocale } from "@/middleware";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "IoT Link Nexus",
  description: "NextJS-IoT-Firebase-CRUD-API",
};

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang ?? defaultLocale}>
      {/* <body className={`${inter.className} dark text-foreground bg-background`}> */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="apple-touch-icon"
        href="/apple-icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />
      <body className={inter.className}>
        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
