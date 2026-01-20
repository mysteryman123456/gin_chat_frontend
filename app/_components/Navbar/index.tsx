"use client";
import Image from "next/image";
import ThemeButton from "../ThemeButton";
import NotificationButton from "../NotifcationButton";
import Link from "next/link";
import NavbarDropdown from "../NavbarDropdown";
import { useAuthStore } from "@/app/hooks/useAuth";

export default function ChatNavbar() {
  const { isAuthenticated, loading, user } = useAuthStore();
  return (
    <nav className="w-full bg-gray-50/60 dark:bg-[#2b2d31] shadow-xs px-4 py-3 flex items-center justify-between">
      <Link href={"/"} className="flex items-center mr-5">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <span className="text-lg font-semibold">GinChat</span>
      </Link>

      <div className="flex items-center space-x-2">
        <NotificationButton />
        <ThemeButton />
        <NavbarDropdown
          loading={loading}
          isAuthenticated={isAuthenticated}
          user={user}
        />
      </div>
    </nav>
  );
}
