"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "@/app/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import ProfileCard from "../Profile";
import SettingsCard from "../Settings";
import { Button } from "@/components/ui/button";
import { LogOut, User2, Settings } from "lucide-react";
import { logout } from "@/lib/api/auth";

interface NavbarDropdownProps {
  loading: boolean;
  isAuthenticated: boolean;
  user?: User | null;
}

export default function NavbarDropdown({
  loading,
  isAuthenticated,
  user,
}: NavbarDropdownProps) {
  console.log(user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-10 w-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-primary/40 transition">
          {loading ? (
            <Skeleton className="h-full w-full rounded-full" />
          ) : user?.profile_image && isAuthenticated ? (
            <Image
              src={user?.profile_image}
              alt={user.username}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-700">
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-200">
                {user?.username?.charAt(0)?.toUpperCase() ?? "U"}
              </span>
            </div>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-xl p-2 shadow-lg "
      >
        {loading ? (
          <div className="p-4">
            <Skeleton className="h-10 w-10 rounded-full mb-3" />
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ) : isAuthenticated && user ? (
          <>
            <div className="flex items-center gap-2 py-2">
              <div className="relative h-9 w-9 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                {user.profile_image ? (
                  <Image
                    src={user.profile_image}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium leading-none">
                  {user.username}
                </p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <User2 size={16} />
                Profile
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-3 rounded-xl w-80">
                  <ProfileCard />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="gap-2">
                <Settings size={16} />
                Settings
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="p-3 rounded-xl w-80">
                  <SettingsCard />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="hover:bg-red-50 hover:text-red-700 text-red-700 dark:hover:bg-red-900 dark:hover:text-red-100 dark:text-red-300"
              asChild
            >
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-700"
              >
                <LogOut className="h-4 w-4 text-red-700 dark:text-red-300" />
                Logout
              </Button>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/signup">Signup</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
