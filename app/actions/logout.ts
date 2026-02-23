"use server";

import { cookies } from "next/headers";

export const logoutAction = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("token");
    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || "Logout failed");
  }
};
