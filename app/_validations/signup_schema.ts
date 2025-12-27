import z from "zod/v3";

export const signup_schema = z.object({
  username: z.string().min(2, "Username required"),
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/,
      "Password must be 8-20 chars with at least one number and a special char"
    ),
});

export type SignupSchemaType = z.infer<typeof signup_schema>;
