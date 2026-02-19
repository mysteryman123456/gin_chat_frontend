import { Loader, Paperclip, PhoneCall, Send, UserPlus2 } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { MessagedUsers } from "../ChatSideBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useJoinConversation } from "@/lib/socket/join_room_named_conversation_id";
import { useAuthStore } from "@/app/hooks/useAuth";
import { SendFileType, uploadFile } from "@/lib/api/upload";
import DisplayContentInChat from "../DisplayFileInChat";
import { toast } from "react-toastify";
import {
  getFileTypeFromUploadedFile,
  saveLastMessageToLocalStorage,
} from "@/lib/utils";
import { socket } from "@/lib/socket/socket";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/api/fetcher";
import { useAddMember } from "@/app/hooks/useAddMembers";
import { addMembersInGroup } from "@/lib/api/conversation";
import AudioCallWrapper from "../AudioCallWrapper";

export type FileUrl = string | null | undefined;
export type MessageType = {
  sender_id: string;
  content: string | null | undefined;
  file_url: FileUrl;
  createdAt: string | Date;
  type: SendFileType;
};

function ChatSection({ user }: { user: MessagedUsers | null }) {
  const [fileLoading, setFileLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const messageBar = useRef<HTMLDivElement | null>(null);
  const [text, setText] = useState("");
  const { user: myUser } = useAuthStore();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { setOpen, open, user_id_array, clearUserIdArray } = useAddMember();

  useJoinConversation(user?.conversation_id);
  const { data } = useQuery<MessageType[]>({
    queryKey: ["messages", user?.conversation_id!],
    enabled: !!user?.conversation_id,
    queryFn: async () => await fetcher(`/message/${user?.conversation_id}`),
  });

  const scrollToBottom = () => {
    if (messageBar.current) {
      messageBar.current.scrollTop = messageBar.current.scrollHeight;
    }
  };

  useEffect(() => {
    setMessages([]);
    if (data && data?.length > 0) {
      setMessages(data);
      saveLastMessageToLocalStorage(
        user?.conversation_id!,
        data[data.length - 1].content!
      );
      setTimeout(scrollToBottom, 0);
    }
  }, [data]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (data: MessageType) => {
      if (data.sender_id !== myUser?._id) {
        setMessages((prev) => [...prev, data]);
        saveLastMessageToLocalStorage(user?.conversation_id!, data.content!);
      }
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [myUser?._id]);

  const addFile = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;
      const singleFile = files?.[0];
      if (!singleFile) return;
      const file_type = getFileTypeFromUploadedFile(singleFile.type);
      setFileLoading(true);
      const response = await uploadFile(singleFile);
      if (response) {
        const newMessage = {
          sender_id: myUser?._id!,
          content: null,
          file_url: response.data.file_url,
          type: file_type,
          conversation_id: user?.conversation_id,
        };
        socket.emit("send_message", newMessage);
        setMessages((prev) => [
          ...prev,
          { ...newMessage, createdAt: new Date() },
        ]);
      }
    } catch (e: any) {
      return toast.error(e.message || "Failed to send file");
    } finally {
      setFileLoading(false);
    }
  };

  const send = () => {
    if (!text.trim()) return;
    const newMessage = {
      content: text,
      file_url: null,
      sender_id: myUser?._id!,
      type: "TEXT" as SendFileType,
      conversation_id: user?.conversation_id,
    };
    socket.emit("send_message", newMessage);
    setMessages((prev) => [...prev, { ...newMessage, createdAt: new Date() }]);
    saveLastMessageToLocalStorage(user?.conversation_id!, text);
    setText("");
  };

  if (!user)
    return (
      <div className="w-full dark:bg-neutral-800 bg-neutral-50 h-full flex items-center justify-center">
        <Image
          alt="logo"
          className="grayscale"
          width={300}
          height={300}
          src={"/logo.png"}
        />
      </div>
    );

  const displayUser = user.type === "SINGLE" ? user.users[0] : null;
  const displayName =
    user.type === "SINGLE"
      ? displayUser?.username || "Unknown"
      : user.group_name || "Group Chat";
  const displayImage =
    user.type === "SINGLE"
      ? displayUser?.profile_image || "/mouse.png"
      : "/mouse.png";

  function openToggleInSideBar() {
    setOpen();
    if (!open) toast.info("Please check on the left sidebar");
  }

  const addMembers = async () => {
    try {
      const userExist = user?.users?.find((u) => user_id_array.includes(u._id));
      if (userExist)
        return toast.error(
          userExist.username + " already exists in this group"
        );
      const res = await addMembersInGroup(
        user_id_array,
        user?.conversation_id!
      );
      if (res.success) {
        clearUserIdArray();
        if (open) setOpen();
        return toast.success(res.message || "Users added successfully");
      }
    } catch (e: any) {
      clearUserIdArray();
      if (open) setOpen();
      return toast.error(e.message || "Something went wrong");
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50 dark:bg-[#313338]">
      <div className="h-16 px-6 flex items-center justify-between gap-3 border-b border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#313338]">
        <div className="flex items-center gap-2">
          <img
            src={displayImage}
            className="w-9 h-9 rounded-full"
            alt={displayName}
          />
          <div>
            <p className="font-semibold text-sm">{displayName}</p>
            {user.type === "GROUP" && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user.users.length} members
              </p>
            )}
          </div>
        </div>
        {displayUser ? (
          <AudioCallWrapper
            conversation_id={user?.conversation_id!}
            peerName={displayName}
          >
            <Button size={"icon"} variant={"outline"}>
              <PhoneCall />
            </Button>
          </AudioCallWrapper>
        ) : (
          <>
            {open && user_id_array.length >= 1 ? (
              <>
                <Button onClick={addMembers} size={"xs"} variant={"outline"}>
                  Add selected members
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={openToggleInSideBar}
                  size={"xs"}
                  variant={"outline"}
                >
                  {user_id_array.length <= 0 && !open
                    ? "Add members"
                    : "Cancel"}
                </Button>
              </>
            )}
          </>
        )}
      </div>

      <div
        ref={messageBar}
        className="flex-1 pattern overflow-y-auto p-6 space-y-10"
      >
        {messages.map((m, i) => (
          <DisplayContentInChat
            key={i}
            sender_id={m.sender_id}
            content={m.content}
            createdAt={m.createdAt}
            file_url={m.file_url}
            type={m.type}
            conversationType={user.type}
            users={user.users}
          />
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#313338]">
        <div className="max-w-2xl flex gap-2 w-full mx-auto">
          <Button
            disabled={fileLoading}
            variant={"secondary"}
            onClick={addFile}
            size={"icon"}
          >
            {!fileLoading ? <Paperclip /> : <Loader className="animate-spin" />}
          </Button>
          <input
            disabled={fileLoading}
            ref={fileRef}
            onChange={(e) => handleFileChange(e)}
            className="hidden"
            type="file"
          />
          <input
            disabled={fileLoading}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-100 dark:bg-[#1e1f22] outline-none text-sm"
          />
          <Button
            disabled={fileLoading}
            onClick={send}
            size={"icon"}
            className="px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Send />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default memo(ChatSection, (prev, next) => {
  return prev.user?.conversation_id === next.user?.conversation_id;
});
