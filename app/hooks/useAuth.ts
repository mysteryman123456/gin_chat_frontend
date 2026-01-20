"use client";
import { create } from "zustand";

export type User = {
  username: string;
  profile_image: string | null;
  role: string;
  id: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setUserData: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  setLoading: (value) => set({ loading: value }),

  setUserData: (user) =>
    set({
      user,
      isAuthenticated: true,
      loading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));
