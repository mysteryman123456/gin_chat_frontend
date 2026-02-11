"use client";

import FormInput from "@/app/_components/FormInput";
import {
  ForgotPasswordSchemaType,
  forgot_password_schema,
} from "@/app/_validations/forgot_password_schema";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgot_password_schema),
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      const response = await forgotPassword(data.email);
      if (response.success && response.data.token) {
        toast.success(response.message || "Please check your email");
        return replace(`/reset-password?token=${response?.data?.token}`);
      }
      return toast.error("If email exsits, otp is sent");
    } catch (e: any) {
      return toast.error(e.message);
    }
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

      <Button disabled={isSubmitting} className="w-full">
        Send OTP
      </Button>

      <p className="text-center text-sm">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}
