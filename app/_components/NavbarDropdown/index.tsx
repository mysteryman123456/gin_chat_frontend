"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/app/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
          {loading ? (
            <Skeleton className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full" />
          ) : user?.profile_image && isAuthenticated ? (
            <Image
              src={user.profile_image}
              alt={user.username}
              width={40}
              height={40}
              className="object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-300 font-semibold">
                {user?.username?.charAt(0).toUpperCase() || ""}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-4 min-w-50">
        {loading ? (
          <></>
        ) : isAuthenticated && user ? (
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                {user.profile_image ? (
                  <Image
                    src={user.profile_image}
                    alt={user.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-300 font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {user.username}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
            </div>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </div>
        ) : (
          <>
            <Link href="/login">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link href="/signup">
              <DropdownMenuItem>Signup</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
