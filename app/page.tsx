"use client";

import Sidebar from "./_components/ChatSideBar";
import ChatSection from "./_components/ChatSection";

export type User = {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  time: string;
};

export default function ChatLayout() {
  return (
    <div className="flex h-screen border-gray-200 dark:border-neutral-900 border-t">
      <Sidebar />
      <ChatSection />
    </div>
  );
}
