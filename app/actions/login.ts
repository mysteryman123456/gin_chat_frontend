"use server";

import { cookies } from "next/headers";
import { login } from "@/lib/api/auth";
import { LoginSchemaType } from "../_validations/login_schema";

export const loginAction = async (data: LoginSchemaType) => {
  try {
    const response = await login(data);
    const cookieStore = await cookies();
    if (!response.data.token) throw new Error("Token not found in response");
    cookieStore.set({ name: "token", value: response.data.token });

    return { success: true };
  } catch (error: any) {
    throw new Error(error.message || "Login failed");
  }
};
