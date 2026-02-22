"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../../FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/lib/api/profile";

const updatePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old password is required"),
    new_password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export default function SettingsCard() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password updated successfully");
      reset();
    },
    onError: (err: any) => {
      toast.error(err.message);
    },
  });

  return (
    <form className="max-w-sm" onSubmit={handleSubmit((v) => mutate(v))}>
      <h2 className="text-base font-semibold">Update Password</h2>
      <p className="text-xs mb-2 text-gray-500">
        After update please logout and login to see the reflect
      </p>

      <FormInput
        placeholder="e.g **********"
        label="Old Password"
        type="password"
        {...register("old_password")}
        error={errors.old_password}
      />
      <FormInput
        placeholder="e.g **********"
        label="New Password"
        type="password"
        {...register("new_password")}
        error={errors.new_password}
      />
      <FormInput
        placeholder="e.g **********"
        label="Confirm Password"
        type="password"
        {...register("confirm_password")}
        error={errors.confirm_password}
      />

      <Button className="w-full mt-4" disabled={isPending}>
        {isPending ? "Updating..." : "Change Password"}
      </Button>
    </form>
  );
}
