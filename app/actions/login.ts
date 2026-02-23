"use server";

import { cookies } from "next/headers";
import { login } from "@/lib/api/auth";
import { LoginSchemaType } from "../_validations/login_schema";

export const loginAction = async (data: LoginSchemaType) => {
  try {
    const response = await login(data);
    const cookieStore = await cookies();
    if (!response.data.token) throw new Error("Token not found in response");
    cookieStore.set("token", response.data.token, {
      httpOnly: false,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
