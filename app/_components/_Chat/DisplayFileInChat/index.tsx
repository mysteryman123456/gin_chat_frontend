"use client";

import { MessageType } from "../ChatSection";
import { Download } from "lucide-react";
import { useAuthStore } from "@/app/hooks/useAuth";
import { timeAgo } from "@/lib/utils";
import { memo, useEffect, useState } from "react";
import Image from "next/image";

interface DisplayContentProps extends MessageType {
  conversationType: "SINGLE" | "GROUP";
  users: {
    username: string;
    profile_image: string;
    _id: string;
  }[];
}

function SenderInfo({
  senderInfo,
}: {
  senderInfo?: {
    username: string;
    profile_image: string;
  };
}) {
  if (!senderInfo) return null;

  return (
    <div className="flex items-start gap-2 ">
      <div className="relative border rounded-full w-8 h-8 overflow-hidden">
        <Image
          fill
          className="object-cover"
          src={senderInfo.profile_image || "/mouse.png"}
          alt={senderInfo.username}
        />
      </div>
    </div>
  );
}

function DisplayContentInChat({
  content,
  type,
  file_url,
  sender_id,
  createdAt,
  users,
}: DisplayContentProps) {
  const { user } = useAuthStore();

  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  const isMe = sender_id === user?._id;
  const senderInfo = users.find((u) => u._id === sender_id);

  const alignmentClass = isMe ? "ml-auto items-end" : "mr-auto items-start";

  const borderRadiusClass = isMe
    ? "rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-none"
    : "rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-none";

  const SenderWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className={` flex flex-col ${alignmentClass}`}>
      <div
        className={`flex flex-row gap-2 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {!isMe && <SenderInfo senderInfo={senderInfo} />}

        <div className="relative">
          {!isMe && (
            <span className="text-xs absolute whitespace-nowrap -top-5 left-0 dark:text-gray-300 text-gray-500">
              {senderInfo?.username}
            </span>
          )}

          {children}
        </div>
      </div>
    </div>
  );

  switch (type) {
    case "TEXT":
      return (
        <SenderWrapper>
          <div
            className={`
              ${borderRadiusClass}
              w-full max-w-sm wrap-break-word px-4 py-2 text-sm
              ${
                isMe
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-200 text-gray-900"
              }
            `}
          >
            {content}
            <p
              className={`text-[6px] ${
                isMe ? "text-right" : "text-left"
              }  opacity-90 mt-1`}
            >
              {timeAgo(createdAt)}
            </p>
          </div>
        </SenderWrapper>
      );

    case "IMAGE":
      return (
        <SenderWrapper>
          <div className="border w-full max-w-xs backdrop-blur-xs aspect-video rounded-md overflow-hidden relative group">
            <img
              src={file_url!}
              alt="chat-image"
              className="w-full h-full object-contain"
            />

            <div className="absolute inset-0 bg-black/40  opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a
                href={file_url!}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-md w-10 h-10 flex items-center justify-center"
              >
                <Download className="text-gray-700" size={20} />
              </a>
            </div>
          </div>
        </SenderWrapper>
      );

    case "VIDEO":
      return (
        <SenderWrapper>
          <div className="w-full border max-w-xs aspect-video rounded-md overflow-hidden">
            <video
              src={file_url!}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        </SenderWrapper>
      );

    case "AUDIO":
      if (!file_url) return null;
      return (
        <SenderWrapper>
          <div className="w-sm max-w-xs rounded-md">
            <audio controls className="w-full">
              <source src={file_url!} type="audio/mpeg" />
            </audio>
          </div>
        </SenderWrapper>
      );

    case "FILE":
      return (
        <SenderWrapper>
          <a
            target="_blank"
            href={file_url!}
            download
            className="w-full max-w-sm cursor-pointer px-3 flex items-center gap-2 py-2 bg-gray-200 dark:bg-[#3a3c43] rounded-md text-sm hover:bg-gray-300 dark:hover:bg-[#4a4c53]"
          >
            Download File <Download size={14} />
          </a>
        </SenderWrapper>
      );

    default:
      return null;
  }
}

export default memo(DisplayContentInChat);
