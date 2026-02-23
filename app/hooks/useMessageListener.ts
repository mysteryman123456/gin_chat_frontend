"use client";

import { useEffect } from "react";
import { socket } from "@/lib/socket/socket";
import { toast } from "react-toastify";
import { MessageType } from "@/app/_components/_Chat/ChatSection";

type MessageFromBackendInSocket = MessageType & {
  conversation_id: string;
  by: string;
};

export function useMessageListener(
  myUserId?: string,
  activeConversationId?: string
) {
  useEffect(() => {
    if (!myUserId) return;
    if (!socket.connected) socket.connect();

    const handleLiveMessage = (message: MessageFromBackendInSocket) => {
      if (message.conversation_id === activeConversationId) return;

      const toastContent =
        message.type === "TEXT"
          ? `${message.by} : ${message.content}`
          : `New ${message.type.toLowerCase()} from ${message.by}`;

      toast.info(toastContent, {
        position: "top-center",
        toastId: `live-${message.conversation_id}`,
      });
    };
    socket.on("live_message", handleLiveMessage);

    return () => {
      socket.off("live_message", handleLiveMessage);
    };
  }, [myUserId, activeConversationId]);
}
