"use client";
import FormInput from "@/app/_components/FormInput";
import {
  SignupSchemaType,
  signup_schema,
} from "@/app/_validations/signup_schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signup_schema),
  });

  const onSubmit = (data: SignupSchemaType) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white max-w-sm mx-auto space-y-4 p-6"
    >
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <p className="text-sm text-gray-500">
        Join Nepal&apos;s top secure chat application
      </p>

      <FormInput
        type="text"
        label="Username"
        placeholder="First name"
        {...register("username")}
        error={errors.username}
      />

      <FormInput
        type="text"
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email}
      />

      <FormInput
        label="Password"
        type="password"
        placeholder="Create a password"
        {...register("password")}
        error={errors.password}
      />

      <Button className="w-full">Create Account</Button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link href={"/login"} className="font-semibold cursor-pointer">
          Sign in
        </Link>
      </p>
    </form>
  );
}
