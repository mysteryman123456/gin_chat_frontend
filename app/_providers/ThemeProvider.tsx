"use client";
import { createContext, useState, useEffect, useLayoutEffect } from "react";

type Theme = "dark" | "light";

type ThemeContextType = {
  theme: Theme | undefined;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const currentClass = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(savedTheme || currentClass);
  }, []);

  useEffect(() => {
    if (!theme) return;

    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
