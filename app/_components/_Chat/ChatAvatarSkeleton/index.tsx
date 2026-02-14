"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ChatAvatarSkeleton() {
  return (
    <div className="flex p-4 flex-col space-y-10">
      <div className="flex w-fit items-center gap-4">
        <Skeleton className="size-10 bg-gray-300 dark:bg-gray-600 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 w-37.5" />
          <Skeleton className="h-4  bg-gray-300 dark:bg-gray-600 w-25" />
        </div>
      </div>
      <div className="flex w-fit items-center gap-4">
        <Skeleton className="size-10 bg-gray-300 dark:bg-gray-600 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 w-37.5" />
          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 w-25" />
        </div>
      </div>
      <div className="flex w-fit items-center gap-4">
        <Skeleton className="size-10 bg-gray-300 dark:bg-gray-600 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 w-37.5" />
          <Skeleton className="h-4 bg-gray-300 dark:bg-gray-600 w-25" />
        </div>
      </div>
    </div>
  );
}
