"use client";
import { useRouter } from "next/navigation";
import ChatSection from "./_components/_Chat/ChatSection";
import Sidebar, { MessagedUsers } from "./_components/_Chat/ChatSideBar";
import Loader from "./_components/Loader";
import { useAuthStore } from "./hooks/useAuth";
import { useCallback, useEffect, useState } from "react";

export default function ChatLayout() {
  const router = useRouter();
  const { isAuthenticated, user, loading } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<MessagedUsers | null>(null);
  const handleSelectUser = useCallback((user: MessagedUsers) => {
    setSelectedUser(user);
  }, []);
  //
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <Loader />;
  if (isAuthenticated && user)
    return (
      <div className="flex h-screen">
        <Sidebar onChange={handleSelectUser} />
        <ChatSection user={selectedUser} />
      </div>
    );
}
