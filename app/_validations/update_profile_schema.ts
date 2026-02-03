import z from "zod";

export const update_profile_schema = z.object({
  username: z.string().min(2, "Username required"),
  profile_image: z
    .string({ error: "Profile Image is required" })
    .url({ error: "Need a valida profile image" }),
});

export type UpdateProfileData = z.infer<typeof update_profile_schema>;
