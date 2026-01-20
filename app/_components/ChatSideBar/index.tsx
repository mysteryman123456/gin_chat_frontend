import { useAuthStore } from "@/app/hooks/useAuth";
import { Search } from "lucide-react";
import { useState } from "react";
import ChatAvatarSkeleton from "../ChatAvatarSkeleton";

const users = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    online: true,
    by: "1",
    lastMessage: "Hey, how are you?",
    time: "10:32 AM",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    online: false,
    by: "0",
    lastMessage: "See you tomorrow",
    time: "Yesterday",
  },
];

export default function Sidebar() {
  const { isAuthenticated, user, loading } = useAuthStore();
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <aside className="w-80 border-r border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#2b2d31] flex flex-col">
      {loading && <ChatAvatarSkeleton />}
      {!isAuthenticated && !loading && <></>}
      {isAuthenticated && (
        <div className="relative">
          <div className="p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 rounded-md bg-gray-100 dark:bg-[#1e1f22] text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.map((user) => (
              <button
                key={user.id}
                className="w-full px-4 py-3 flex gap-3 items-center hover:bg-gray-100 dark:hover:bg-[#3a3c43] transition"
              >
                <div className="relative">
                  <img src={user.avatar} className="w-10 h-10 rounded-full" />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#2b2d31]
                ${user.online ? "bg-green-500" : "bg-red-500"}`}
                  />
                </div>

                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{user.name}</span>
                    <span className="text-xs text-gray-400">{user.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.by === "0" ? user.name : "You"}&nbsp;:{" "}
                    {user.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
