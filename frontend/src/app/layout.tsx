import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/src/component/NavBar";
import { AuthProvider } from "@/src/context/AuthContext";

export const lexend = localFont({
  src: "../../public/fonts/Lexend-VariableFont_wght.ttf",
  variable: "--font-lexend",
  display: "swap",
  fallback: ["system-ui"],
  style: "normal",
});

export const metadata: Metadata = {
  title: "AQI Scoping",
  description: "AQI Tracker with weekly reports.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="bg-black">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
