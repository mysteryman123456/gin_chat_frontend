import { useAuthStore } from "@/app/hooks/useAuth";
import { Search } from "lucide-react";
import { memo, useEffect, useState } from "react";
import ChatAvatarSkeleton from "../ChatAvatarSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api/fetcher";
import { socket } from "@/lib/socket/socket";
import { getLastMessageFromLocalStorage } from "@/lib/utils";
import { useAddMember } from "@/app/hooks/useAddMembers";
import { Checkbox } from "@/components/ui/checkbox";
import { useJoinOnline } from "@/lib/socket/join_room_named_conversation_id";

export type MessagedUsers = {
  users: {
    username: string;
    profile_image: string;
    _id: string;
  }[];
  group_name: string | null;
  type: "SINGLE" | "GROUP";
  conversation_id: string;
};

function Sidebar({ onChange }: { onChange: (user: MessagedUsers) => void }) {
  const { addIdInUserIdArray, open, user_id_array } = useAddMember();
  const { isAuthenticated, loading: sessionLoading, user } = useAuthStore();
  const [search, setSearch] = useState("");
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useJoinOnline(user?._id);
  useEffect(() => {
    if (!socket) return;
    socket.on("online_users", (data: string[]) => {
      setOnlineUsers(data);
    });
  }, []);

  const { data: conversations, isLoading } = useQuery<MessagedUsers[]>({
    queryKey: ["messagedusers"],
    staleTime: 0,
    queryFn: async () => await fetcher("/conversation"),
  });

  const filtered = conversations?.filter((conversation) => {
    const displayName =
      conversation.type === "SINGLE"
        ? conversation.users[0]?.username || ""
        : conversation.group_name || "";
    return displayName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside className="min-w-80 border-r relative border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#2b2d31] flex flex-col">
      {(sessionLoading || isLoading) && <ChatAvatarSkeleton />}
      {!isAuthenticated && !sessionLoading && <></>}
      {isAuthenticated && !isLoading && (
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
            {filtered?.map((conversation) => {
              const displayUser =
                conversation.type === "SINGLE" ? conversation.users[0] : null;
              const displayName =
                conversation.type === "SINGLE"
                  ? displayUser?.username!
                  : conversation.group_name || "Group Chat";
              const displayImage =
                conversation.type === "SINGLE"
                  ? displayUser?.profile_image || "/mouse.png"
                  : "/mouse.png";
              const isUserOnline =
                conversation.type === "SINGLE" && displayUser
                  ? onlineUsers.includes(displayUser._id)
                  : false;

              return (
                <div
                  className="flex items-center gap-2 w-full hover:bg-gray-100 dark:hover:bg-[#3a3c43] transition"
                  key={conversation.conversation_id}
                >
                  <button
                    disabled={open}
                    onClick={() => onChange(conversation)}
                    className="w-full px-4 py-3 flex gap-3 items-center"
                  >
                    <div className="relative flex items-center">
                      {displayUser ? (
                        <img
                          src={displayImage}
                          className="w-10 h-10 rounded-full"
                          alt={displayName}
                        />
                      ) : (
                        <div className="w-10 border rounded-full h-10 flex items-center justify-center">
                          <span>{displayName[0]}</span>
                        </div>
                      )}
                      {conversation.type === "SINGLE" && (
                        <span
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#2b2d31]
                ${isUserOnline ? "bg-green-500" : "bg-red-500"}`}
                        />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">
                          {displayName}
                        </span>
                      </div>
                      <p className="text-xs line-clamp-2 whitespace-nowrap max-w-50 text-gray-500 dark:text-gray-400 truncate">
                        {getLastMessageFromLocalStorage(
                          conversation.conversation_id
                        ) || (isUserOnline ? "Online" : "Offline")}
                      </p>
                    </div>
                  </button>
                  {open && conversation.type === "SINGLE" && displayUser && (
                    <div className="mr-4">
                      <Checkbox
                        className="border border-gray-500"
                        checked={user_id_array.includes(displayUser._id)}
                        onCheckedChange={(checked) => {
                          addIdInUserIdArray(
                            displayUser._id,
                            checked as boolean
                          );
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

export default memo(Sidebar);
