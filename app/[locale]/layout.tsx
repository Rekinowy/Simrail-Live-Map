import ThemeContextProvider from "@/context/ThemeContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SimRail Live Map",
  description: "Live map where you can find and track trains and players in SimRail\u00AE game",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="h-[100dvh] scroll-smooth scrollbar scrollbar-w-2 scrollbar-h-2 scrollbar-thumb-primary scrollbar-track-primary_dark scrollbar-thumb-rounded-lg bg-gray-800">
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </body>
    </html>
  );
}
