"use client";

import { PhoneOff } from "lucide-react";

type Props = {
  callerName: string;
  onEnd: () => void;
};

export default function ActiveCallBar({ callerName, onEnd }: Props) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1e1f22] text-white rounded-full px-6 py-3 flex items-center gap-4 shadow-2xl">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-sm font-medium">Call with {callerName}</span>
      <button
        onClick={onEnd}
        className="w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center"
      >
        <PhoneOff className="w-4 h-4" />
      </button>
    </div>
  );
}
