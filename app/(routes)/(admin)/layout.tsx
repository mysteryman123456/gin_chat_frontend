"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/_components/Loader";
import { useAuthStore } from "@/app/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Users, Settings } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { loading, isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || user?.role !== "user") {
        router.push("/login");
      }
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading || !user) return <Loader />;

  const sidebarItems = [
    {
      label: "Users",
      href: "/admin/users",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: <Settings className="w-4 h-4 mr-2" />,
    },
  ];

  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-neutral-900">
      <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-gray-200 dark:border-neutral-900 flex flex-col">
        <ScrollArea className="flex-1 mt-4 px-2">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>
                  <Button
                    variant="ghost"
                    className="cursor-pointer w-full justify-start text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center"
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </aside>

      <main className="overflow-auto w-full p-4 text-gray-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
