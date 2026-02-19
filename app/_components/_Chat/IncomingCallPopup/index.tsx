"use client";

import { PhoneCall, PhoneOff } from "lucide-react";

type Props = {
  callerName: string;
  onAccept: () => void;
  onReject: () => void;
};

export default function IncomingCallPopup({
  callerName,
  onAccept,
  onReject,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#313338] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6 w-80 animate-in fade-in zoom-in duration-200">
        <div className="relative flex items-center justify-center">
          <span className="absolute inline-flex h-20 w-20 rounded-full bg-green-400 opacity-30 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
            <PhoneCall className="text-white w-8 h-8" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Incoming audio call
          </p>
          <p className="text-lg font-semibold">{callerName}</p>
        </div>

        <div className="flex gap-6">
          <button
            onClick={onReject}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 transition flex items-center justify-center shadow-lg">
              <PhoneOff className="text-white w-6 h-6" />
            </div>
            <span className="text-xs text-gray-500">Decline</span>
          </button>

          <button
            onClick={onAccept}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition flex items-center justify-center shadow-lg">
              <PhoneCall className="text-white w-6 h-6" />
            </div>
            <span className="text-xs text-gray-500">Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}
