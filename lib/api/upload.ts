import { isAxiosError } from "axios";
import api from "./axios";
import { API_END_POINT } from "./endpoints";

export type SendFileType = "AUDIO" | "VIDEO" | "FILE" | "IMAGE" | "TEXT";

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(API_END_POINT.UPLOAD_FILE, formData, {});

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
