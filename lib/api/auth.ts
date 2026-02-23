import { SignupSchemaType } from "@/app/_validations/signup_schema";
import api from "./axios";

import { API_END_POINT } from "./endpoints";
import { isAxiosError } from "axios";
import { LoginSchemaType } from "@/app/_validations/login_schema";
import { logoutAction } from "@/app/actions/logout";
import { toast } from "react-toastify";

export const signup = async (data: SignupSchemaType) => {
  try {
    const response = await api.post(API_END_POINT.SIGNUP, data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Registration failed");
  }
};

export const verifyToken = async () => {
  try {
    const response = await api.get(API_END_POINT.VERIFY_TOKEN);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Token verification failed");
  }
};

export const login = async (data: LoginSchemaType) => {
  try {
    const response = await api.post(API_END_POINT.LOGIN, data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    const response = await logoutAction();
    if (response.success) {
      return (window.location.href = "/");
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Logout failed";
    toast.error(errorMessage);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post(API_END_POINT.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Operation failed");
  }
};

export const resetPassword = async (
  password: string,
  otp: string,
  token: string
) => {
  try {
    const response = await api.post(
      `${API_END_POINT.RESET_PASSWORD}?token=${token}`,
      { otp, password }
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Operation failed");
  }
};
