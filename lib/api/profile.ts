import { isAxiosError } from "axios";
import api from "./axios";
import { API_END_POINT } from "./endpoints";
import { UpdateProfileData } from "@/app/_validations/update_profile_schema";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(API_END_POINT.UPLOAD_IMAGE, formData, {});

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message;
      throw new Error(errorMessage);
    }
    throw new Error("Image upload failed");
  }
};

export const updateProfile = async (id: string, data: UpdateProfileData) => {
  try {
    const response = await api.patch(
      `${API_END_POINT.PROFILE_UPDATE}/${id}`,
      data
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error || error.response?.data?.message;
      throw new Error(errorMessage);
    }
    throw new Error("Profile update failed");
  }
};
