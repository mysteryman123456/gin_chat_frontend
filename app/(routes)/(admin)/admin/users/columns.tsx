"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { AdminUserResponse } from "./page";
import Image from "next/image";

export const adminUserColumns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (user: AdminUserResponse) => void;
  onDelete: (id: string) => void;
}): ColumnDef<AdminUserResponse>[] => [
  {
    id: "profile_image",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      const imageSrc = user.profile_image || "/mouse.png";

      return (
        <div className="flex items-center gap-3">
          <Image
            src={imageSrc}
            alt={user.username}
            width={36}
            height={36}
            className="rounded-full w-9 h-9 object-cover border dark:border-gray-700"
          />
          <div className="flex flex-col">
            <span className="font-medium">{user.username}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <span className="capitalize">{row.original.role}</span>,
  },
  {
    accessorKey: "is_blocked",
    header: "Blocked",
    cell: ({ row }) =>
      row.original.is_blocked ? (
        <span className="text-red-500 font-medium">Yes</span>
      ) : (
        <span className="text-green-500 font-medium">No</span>
      ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(row.original)}
        >
          Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          onClick={() => onDelete(row.original._id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
