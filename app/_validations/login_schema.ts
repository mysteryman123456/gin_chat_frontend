import z from "zod/v3";

export const login_schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof login_schema>;
