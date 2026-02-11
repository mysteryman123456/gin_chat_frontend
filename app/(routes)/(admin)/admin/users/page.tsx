"use client";

import { useQuery } from "@tanstack/react-query";
import { API_END_POINT } from "@/lib/api/endpoints";
import { fetcher } from "@/lib/api/fetcher";
import { DataTable } from "@/app/_components/DataTable";
import { adminUserColumns } from "./columns";
import { toast } from "react-toastify";
import { deleteUser } from "@/lib/api/admin";
import Pagination from "@/app/_components/Pagination";
import { useState } from "react";

export type AdminUserResponse = {
  _id: string;
  username: string;
  profile_image?: string;
  role: string;
  createdAt: string;
  is_blocked: boolean;
  email: string;
};
export type ApiResponse = {
  users: AdminUserResponse[];
  current_page: number;
  total_pages: number;
};

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);

  const {
    refetch,
    data: response,
    isLoading,
    isRefetching,
    isError,
  } = useQuery<ApiResponse>({
    queryKey: ["admin-users", page],
    queryFn: async () => await fetcher(API_END_POINT.ADMIN_USERS, page),
  });
  if (isLoading) return <p></p>;
  if (isError) return <p></p>;

  const handleEdit = (user: AdminUserResponse) => {
    toast.info(`Edit ${user.email}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const isConfirmed = confirm("Do you want to delete this user?");
      if (!isConfirmed) return;
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
        data={response?.users || []}
        columns={adminUserColumns({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
      />
      <Pagination
        onPageChange={setPage}
        current_page={response?.current_page!}
        total_pages={response?.total_pages!}
      />
    </div>
  );
}
