"use client";
import ChatSection from "./_components/ChatSection";
import Sidebar from "./_components/ChatSideBar";

export default function ChatLayout() {
  return (
    <div className="flex h-screen border-gray-200 dark:border-neutral-900 border-t">
      <Sidebar />
      <ChatSection />
    </div>
  );
}
