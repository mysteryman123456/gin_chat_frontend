"use client";
import { create } from "zustand";

type AddMemberStore = {
  open: boolean;
  user_id_array: string[];
  addIdInUserIdArray: (userId: string, checked: boolean) => void;
  setOpen: () => void;
  clearUserIdArray: () => void;
};

export const useAddMember = create<AddMemberStore>((set) => ({
  open: false,
  user_id_array: [],
  addIdInUserIdArray: (id: string, checked: boolean) =>
    set((state) => ({
      user_id_array: checked
        ? [...state.user_id_array, id]
        : state.user_id_array.filter((uid) => uid !== id),
    })),
  clearUserIdArray: () =>
    set(() => ({
      user_id_array: [],
    })),
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));
