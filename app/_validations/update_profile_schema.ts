import z from "zod";

export const update_profile_schema = z.object({
  username: z.string().min(2, "Username required"),
  profile_image: z
    .string({ error: "Profile Image is required" })
    .url({ error: "Need a valida profile image" }),
});

export type UpdateProfileData = z.infer<typeof update_profile_schema>;

export const update_user_data_by_admin = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["user", "admin"], { message: "Role must be user or admin" }),
  is_blocked: z.boolean(),
  profile_image: z.string().optional().nullable(),
});

export type UpdateUserByAdminType = z.infer<typeof update_user_data_by_admin>;
