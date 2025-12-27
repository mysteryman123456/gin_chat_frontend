"use client";

import FormInput from "@/app/_components/FormInput";
import {
  ForgotPasswordSchemaType,
  forgot_password_schema,
} from "@/app/_validations/forgot_password_schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function ForgotPassword() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgot_password_schema),
  });

  const onSubmit = (data: ForgotPasswordSchemaType) => {
    push(`/reset-password?email=${data.email}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto space-y-4 p-6"
    >
      <h2 className="text-2xl font-semibold">Forgot Password</h2>

      <p className="text-sm text-gray-500">
        We'll send you an OTP to reset your password.
      </p>

      <FormInput
        type="email"
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email}
      />

      <Button className="w-full">Send OTP</Button>

      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}
