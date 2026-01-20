"use client";

import { verifyToken } from "@/lib/api/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "../hooks/useAuth";

export default function SessionProivder() {
  const { setUserData, setLoading, logout } = useAuthStore();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["session"],
    queryFn: verifyToken,
    retry: false,
  });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (data) setUserData(data.data.payload);
    if (isError) logout();
  }, [data, isError, error]);

  return null;
}
