"use client";

import FormInput from "@/app/_components/FormInput";
import {
  ResetPasswordSchemaType,
  reset_password_schema,
} from "@/app/_validations/reset_password_schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(reset_password_schema),
  });

  const onSubmit = (data: ResetPasswordSchemaType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-sm mx-auto space-y-3 p-6"
    >
      <h2 className="text-2xl font-semibold">Reset Password</h2>

      <p className="text-sm text-gray-500">
        Please provide your email, new password and OTP
      </p>

      <FormInput
        type="password"
        label="New Password"
        {...register("password")}
        error={errors.password}
      />

      <FormInput
        type="password"
        label="Confirm new password"
        {...register("confirm_password")}
        error={errors.confirm_password}
      />

      <FormInput
        type="number"
        label="OTP"
        {...register("otp")}
        error={errors.otp}
      />

      <Button className="w-full">Reset</Button>

      <p className="text-center text-sm">
        Remember your password?
        <Link href="/login" className="ml-1 font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}
