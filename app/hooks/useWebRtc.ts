import { socket } from "@/lib/socket/socket";
import { useEffect, useRef } from "react";

export const useWebRtc = (conversationId: string) => {
  //
  const peerConnection = useRef<null | RTCPeerConnection>(null);
  const localAudio = useRef<null | HTMLAudioElement>(null);
  const remoteAudio = useRef<null | HTMLAudioElement>(null);
  //
  useEffect(() => {
    if (!conversationId) return;
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }],
    });

    peerConnection.current = pc;

    pc.ontrack = (event) => {
      if (!remoteAudio.current) return;
      remoteAudio.current.srcObject = event.streams[0];
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          candidate: event.candidate,
          conversationId,
        });
      }
    };

    socket.on("offer", async (offer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("answer", { answer, conversationId });
    });

    socket.on("answer", async (answer) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", async (candidate) => {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      pc.close();
    };
  }, [conversationId]);

  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    if (!localAudio.current || !peerConnection.current) return;
    localAudio.current.srcObject = stream;

    stream.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, stream);
    });

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit("offer", { offer, conversationId });
  };

  return { startCall, localAudio, remoteAudio };
};
