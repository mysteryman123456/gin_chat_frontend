"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { API_END_POINT } from "@/lib/api/endpoints";
import { fetcher } from "@/lib/api/fetcher";
import { DataTable } from "@/app/_components/DataTable";
import { adminUserColumns } from "./columns";
import { toast } from "react-toastify";
import { deleteUser } from "@/lib/api/admin";

export type AdminUserResponse = {
  _id: string;
  username: string;
  profile_image?: string;
  role: string;
  createdAt: string;
  is_blocked: boolean;
  email: string;
};

export default function AdminUsersPage() {
  const {
    refetch,
    data: users,
    isLoading,
    isRefetching,
    isError,
  } = useQuery<AdminUserResponse[]>({
    queryKey: ["admin-users"],
    queryFn: async () => await fetcher(API_END_POINT.ADMIN_USERS),
  });

  if (isLoading) return <p></p>;
  if (isError) return <p></p>;

  const handleEdit = (user: AdminUserResponse) => {
    toast.info(`Edit ${user.username}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      return refetch();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-4 w-full">
      <DataTable
        isLoading={isLoading || isRefetching}
        data={users || []}
        columns={adminUserColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
      />
    </div>
  );
}
