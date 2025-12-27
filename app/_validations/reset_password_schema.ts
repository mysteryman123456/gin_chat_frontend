import z from "zod/v3";

export const reset_password_schema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/,
        "Password must be 8-20 chars with at least one number and a special char"
      ),
    otp: z
      .string()
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits"),
    confirm_password: z.string().min(1, "New password is required").trim(),
  })
  .refine((data) => data.confirm_password === data.password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type ResetPasswordSchemaType = z.infer<typeof reset_password_schema>;
