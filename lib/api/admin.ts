import { isAxiosError } from "axios";
import api from "./axios";
import { API_END_POINT } from "./endpoints";

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`${API_END_POINT.ADMIN_USERS}/${userId}`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete user";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to delete user");
  }
};

export type CreateUserPayload = {
  username: string;
  email: string;
  password: string;
  profile_image?: string;
};

export const createUser = async (data: CreateUserPayload) => {
  try {
    const response = await api.post(API_END_POINT.ADMIN_USERS, data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create user";
      throw new Error(errorMessage);
    }
    throw new Error("Failed to create user");
  }
};
