"use client";

import { getSpecificUserById, updateUser } from "@/lib/api/admin";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DragAndDrop from "@/app/_components/_Navbar/DragDrop";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "@/app/_components/Loader";
import {
  UpdateUserByAdminType,
  update_user_data_by_admin,
} from "@/app/_validations/update_profile_schema";
import { zodResolver } from "@hookform/resolvers/zod";

type FormValues = {
  username: string;
  email: string;
  role: "user" | "admin";
  is_blocked: boolean;
  profile_image: string;
};

export default function IndividualUserPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getSpecificUserById(id as string),
    enabled: !!id,
  });

  const user = data?.data;

  type FormValues = UpdateUserByAdminType;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(update_user_data_by_admin),
    defaultValues: {
      username: "",
      email: "",
      role: "user",
      is_blocked: false,
      profile_image: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        email: user.email ?? "",
        role: user.role ?? "user",
        is_blocked: user.is_blocked ?? false,
        profile_image: user.profile_image ?? "",
      });
    }
  }, [user, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: FormValues) =>
      updateUser(id as string, {
        ...payload,
        profile_image: payload.profile_image ?? undefined,
      }),
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <Loader></Loader>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="space-y-4 max-w-3xl rounded-xl border p-4 dark:border-neutral-800"
    >
      <Controller
        name="profile_image"
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            {field.value && (
              <div className="flex items-center gap-3">
                <img
                  src={field.value}
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover border dark:border-neutral-700"
                />
                <div>
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground">
                    Current profile image
                  </p>
                </div>
              </div>
            )}
            <DragAndDrop onChange={field.onChange} />
          </div>
        )}
      />

      <div>
        <Input
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full border rounded-md px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )}
      />

      <Controller
        name="is_blocked"
        control={control}
        render={({ field }) => (
          <select
            value={String(field.value)}
            onChange={(e) => field.onChange(e.target.value === "true")}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="false">Active</option>
            <option value="true">Blocked</option>
          </select>
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Updating..." : "Update User"}
      </Button>
    </form>
  );
}
