import { useEffect } from "react";
import { socket } from "./socket";

export function useJoinConversation(conversationId?: string) {
  useEffect(() => {
    if (!conversationId) return;

    if (!socket.connected) socket.connect();

    socket.emit("join_conversation", { conversationId });

    return () => {
      socket.emit("leave_conversation", { conversationId });
    };
  }, [conversationId]);
}

export function useJoinOnline(myUserId?: string) {
  useEffect(() => {
    if (!myUserId) return;

    if (!socket.connected) socket.connect();

    socket.emit("join_online", { userId: myUserId });
  }, []);
}
