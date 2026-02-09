"use client";

import { useWebRtc } from "@/app/hooks/useWebRtc";

export default function AudioCallWrapper({
  conversation_id,
  children,
}: {
  conversation_id: string;
  children: React.ReactNode;
}) {
  const { localAudio, remoteAudio, startCall } = useWebRtc(conversation_id);
  return (
    <div onClick={startCall}>
      {children}
      <audio ref={localAudio} autoPlay muted />
      <audio ref={remoteAudio} autoPlay />
    </div>
  );
}
