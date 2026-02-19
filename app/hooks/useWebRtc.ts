import { socket } from "@/lib/socket/socket";
import { useEffect, useRef, useCallback } from "react";

export const useWebRtc = (conversationId: string) => {
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localAudio = useRef<HTMLAudioElement | null>(null);
  const remoteAudio = useRef<HTMLAudioElement | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    pc.ontrack = (event) => {
      if (remoteAudio.current) {
        remoteAudio.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          conversationId,
        });
      }
    };

    peerConnection.current = pc;
    return pc;
  }, [conversationId]);

  const getLocalStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    localStream.current = stream;
    if (localAudio.current) localAudio.current.srcObject = stream;
    return stream;
  }, []);

  // Only emits call_user — NO mic, NO offer yet
  const startCall = useCallback(
    (callerId: string, callerName: string) => {
      createPeerConnection();
      socket.emit("call_user", { conversationId, callerId, callerName });
    },
    [conversationId, createPeerConnection]
  );

  // Receiver accepts — get mic and wait for offer from caller
  const acceptCall = useCallback(async () => {
    const pc = createPeerConnection();
    const stream = await getLocalStream();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    socket.emit("call_accepted", { conversationId });
  }, [conversationId, createPeerConnection, getLocalStream]);

  const rejectCall = useCallback(() => {
    socket.emit("call_rejected", { conversationId });
  }, [conversationId]);

  const endCall = useCallback(() => {
    peerConnection.current?.close();
    peerConnection.current = null;
    localStream.current?.getTracks().forEach((t) => t.stop());
    localStream.current = null;
    if (localAudio.current) localAudio.current.srcObject = null;
    if (remoteAudio.current) remoteAudio.current.srcObject = null;
    socket.emit("call_ended", { conversationId });
  }, [conversationId]);

  useEffect(() => {
    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
      if (!peerConnection.current) return;
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.emit("answer", { answer, conversationId });
    };

    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
      await peerConnection.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    };

    const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
      await peerConnection.current?.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    };

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);

    return () => {
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
    };
  }, [conversationId]);

  return {
    startCall,
    acceptCall,
    rejectCall,
    endCall,
    localAudio,
    remoteAudio,
    peerConnection,
    createPeerConnection,
    getLocalStream,
  };
};
