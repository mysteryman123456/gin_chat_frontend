"use client";

import FormInput from "@/app/_components/FormInput";
import { LoginSchemaType, login_schema } from "@/app/_validations/login_schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(login_schema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white max-w-sm mx-auto space-y-4 p-6"
    >
      <h2 className="text-2xl font-semibold">Welcome back</h2>
      <p className="text-sm text-gray-500">
        Login to Nepal&apos;s top secure chat application
      </p>

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

      <Button className="w-full">Login</Button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href={"/signup"} className="font-semibold cursor-pointer">
          Sign up
        </Link>
      </p>
    </form>
  );
}
