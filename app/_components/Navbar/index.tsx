"use client";
import useTheme from "@/app/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav>
      <Button onClick={toggleTheme} size={"icon-sm"}>
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>
    </nav>
  );
}
