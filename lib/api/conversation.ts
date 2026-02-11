import api from "./axios";
import { API_END_POINT } from "./endpoints";
import { isAxiosError } from "axios";

export const createConversation = async (data: {
  type: "SINGLE" | "GROUP";
  user_id: string;
  group_name: string | null | undefined;
}) => {
  try {
    const response = await api.post(API_END_POINT.CREATE_CONVERSATION, data);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Something went wrong");
  }
};

export const addMembersInGroup = async (
  user_id: string[],
  conversation_id: string
) => {
  try {
    const response = await api.post(API_END_POINT.ADD_MEMBERS_IN_GROUP, {
      user_id,
      conversation_id,
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage =
        error.response?.data.error || error.response?.data.message;
      throw new Error(errorMessage);
    }
    throw new Error("Something went wrong");
  }
};
