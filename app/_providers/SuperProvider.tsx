"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProivder from "./SessionProivder";
import ThemeProvider from "./ThemeProvider";
import ChatNavbar from "../_components/_Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

export default function SuperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SessionProivder />
          <ChatNavbar />
          {children}
          <ToastContainer
            icon={false}
            closeButton={false}
            hideProgressBar
            theme="dark"
            toastStyle={{
              fontSize: "14px",
              padding: "15px",
              minHeight: "unset",
            }}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
