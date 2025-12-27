"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <>
      <Button
        className="rounded-full cursor-pointer bg-neutral-200/60 text-black dark:bg-neutral-700 dark:text-white hover:bg-neutral-200/60 hover:text-black"
        size={"icon-sm"}
      >
        <Bell />
      </Button>
    </>
  );
}
