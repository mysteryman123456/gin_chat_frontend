"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SessionProivder from "./SessionProivder";
import ThemeProvider from "./ThemeProvider";
import ChatNavbar from "../_components/Navbar";
import { ToastContainer } from "react-toastify";

export default function SuperProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SessionProivder />
          <ChatNavbar />
          {children}
          <ToastContainer theme="colored" />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
