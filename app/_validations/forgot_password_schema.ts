import z from "zod/v3";

export const forgot_password_schema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgot_password_schema>;
