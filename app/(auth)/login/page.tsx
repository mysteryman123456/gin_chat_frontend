"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
  email: z
    .string({ error: "Password is required" })
    .min(3, "Email is required"),
  password: z
    .string({ error: "Password is required" })
    .min(3, "Passwrord is required"),
});

type Login = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    formState: { isDirty, isSubmitting, errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = (data: Login) => {
    alert(data);
  };

  return (
    <form
      className="flex flex-col gap-1 max-w-sm"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <label htmlFor="email">Email</label>
      <Input
        placeholder="Email is required"
        {...register("email")}
        name="email"
      />
      {errors.email && (
        <span className="text-sm text-red-600">{errors.email.message}</span>
      )}

      <label htmlFor="password">Password</label>
      <Input
        placeholder="Password is required"
        {...register("password")}
        name="password"
      />
      {errors.password && (
        <span className="text-sm text-red-600">{errors.password.message}</span>
      )}
      <Button disabled={isSubmitting}>Login</Button>
    </form>
  );
}
