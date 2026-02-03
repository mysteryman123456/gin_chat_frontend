import { SignupSchemaType } from "@/app/_validations/signup_schema";
import api from "./axios";

import { API_END_POINT } from "./endpoints";
import { isAxiosError } from "axios";
import { LoginSchemaType } from "@/app/_validations/login_schema";

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
    const response = await api.post(API_END_POINT.LOGOUT);
    if (response.status === 200) {
      return (window.location.href = "/");
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Logout failed");
  }
};
