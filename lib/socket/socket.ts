import { io, type Socket } from "socket.io-client";

export const socket: Socket = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
  {
    autoConnect: false,
    transports: ["websocket"],
  }
);
