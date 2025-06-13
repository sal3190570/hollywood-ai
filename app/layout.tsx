// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import AuthListener from "./components/AuthListener";

export const metadata: Metadata = {
  title: "Hollywood AI",
  description: "Created by Sal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AuthListener />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
