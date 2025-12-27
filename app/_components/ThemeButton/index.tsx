"use client";
import useTheme from "@/app/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <Button
        className="rounded-full cursor-pointer bg-neutral-200/60 text-black dark:bg-neutral-700 dark:text-white hover:bg-neutral-200/60 hover:text-black"
        onClick={toggleTheme}
        size={"icon-sm"}
      >
        {theme === "dark" ? <Sun /> : <MoonStar />}
      </Button>
    </div>
  );
}
