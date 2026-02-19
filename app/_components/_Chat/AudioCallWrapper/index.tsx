"use client";

import { useWebRtc } from "@/app/hooks/useWebRtc";
import { useAuthStore } from "@/app/hooks/useAuth";
import { socket } from "@/lib/socket/socket";
import { useEffect, useState } from "react";
import IncomingCallPopup from "../IncomingCallPopup";
import ActiveCallBar from "../ActiveCallBar";
import { AudioWaveformIcon } from "lucide-react";

type IncomingCall = {
  conversationId: string;
  callerId: string;
  callerName: string;
};

export default function AudioCallWrapper({
  conversation_id,
  children,
  peerName,
}: {
  conversation_id: string;
  children: React.ReactNode;
  peerName: string;
}) {
  const { user } = useAuthStore();
  const {
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    localAudio,
    remoteAudio,
    peerConnection,
    createPeerConnection,
    getLocalStream,
  } = useWebRtc(conversation_id);

  const [callStatus, setCallStatus] = useState<
    "idle" | "calling" | "in-call" | "incoming"
  >("idle");
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

  useEffect(() => {
    const handleIncoming = (data: IncomingCall) => {
      if (data.conversationId !== conversation_id) return;
      setIncomingCall(data);
      setCallStatus("incoming");
    };

    const handleAccepted = async () => {
      const pc = peerConnection.current || createPeerConnection();
      const stream = await getLocalStream();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("offer", { offer, conversationId: conversation_id });
      setCallStatus("in-call");
    };

    const handleRejected = () => {
      setCallStatus("idle");
      setIncomingCall(null);
    };

    const handleEnded = () => {
      setCallStatus("idle");
      setIncomingCall(null);
    };

    socket.on("incoming_call", handleIncoming);
    socket.on("call_accepted", handleAccepted);
    socket.on("call_rejected", handleRejected);
    socket.on("call_ended", handleEnded);

    return () => {
      socket.off("incoming_call", handleIncoming);
      socket.off("call_accepted", handleAccepted);
      socket.off("call_rejected", handleRejected);
      socket.off("call_ended", handleEnded);
    };
  }, [conversation_id]);

  const handleStartCall = () => {
    if (callStatus !== "idle") return;
    setCallStatus("calling");
    startCall(user?._id!, user?.username!);
  };

  const handleAccept = async () => {
    await acceptCall();
    setCallStatus("in-call");
    setIncomingCall(null);
  };

  const handleReject = () => {
    rejectCall();
    setCallStatus("idle");
    setIncomingCall(null);
  };

  const handleEnd = () => {
    endCall();
    setCallStatus("idle");
    setIncomingCall(null);
  };

  return (
    <>
      <div onClick={handleStartCall}>{children}</div>

      <audio ref={localAudio} autoPlay muted />
      <audio ref={remoteAudio} autoPlay />

      {callStatus === "incoming" && incomingCall && (
        <IncomingCallPopup
          callerName={incomingCall.callerName}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      )}

      {callStatus === "in-call" && (
        <ActiveCallBar callerName={peerName} onEnd={handleEnd} />
      )}

      {callStatus === "calling" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#313338] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-72">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">
                <AudioWaveformIcon />
              </span>
            </div>
            <p className="font-semibold">Calling {peerName}...</p>
            <button
              onClick={handleEnd}
              className="text-sm text-red-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
