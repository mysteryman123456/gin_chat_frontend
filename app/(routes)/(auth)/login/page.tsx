"use client";

import FormInput from "@/app/_components/FormInput";
import { LoginSchemaType, login_schema } from "@/app/_validations/login_schema";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(login_schema),
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await login(data);
      if (response.success) {
        toast.success(response?.message || "User logged in successfully");
        return (window.location.href = "/");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to login";
      return toast.error(errorMessage);
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-sm mx-auto space-y-4 p-6"
    >
      <h2 className="text-2xl font-semibold">Welcome back</h2>
      <p className="text-sm text-gray-500">Login into your account</p>

      <FormInput
        type="email"
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email}
      />

      <FormInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password}
      />

      <p className="-mt-2 mb-2 text-right">
        <Link href="/forgot-password" className="text-xs text-muted-foreground">
          Forgot your password?
        </Link>
      </p>

      <Button className="w-full">Login</Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold cursor-pointer">
          Sign up
        </Link>
      </p>
    </form>
  );
}
