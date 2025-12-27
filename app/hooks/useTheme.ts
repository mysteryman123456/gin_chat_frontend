"use client";

import { useContext } from "react";
import { ThemeContext } from "../_providers/ThemeProvider";

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Context not initialized");
  return context;
}
