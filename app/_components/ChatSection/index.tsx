import { Send } from "lucide-react";
import { useState } from "react";

export default function ChatSection() {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setMessages([...messages, { text, me: true }]);
    setText("");
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50 dark:bg-[#313338]">
      <div className="h-16 px-6 flex items-center gap-3 border-b border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#313338]">
        <img
          src="https://i.pravatar.cc/150?img=1"
          className="w-9 h-9 rounded-full"
        />
        <div>
          <p className="font-semibold text-sm">John Doe</p>
          <p className="text-xs text-gray-400">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`w-fit max-w-[69%] px-4 py-2 rounded-lg text-sm
              ${
                m.me
                  ? "ml-auto bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-[#3a3c43] text-gray-900 dark:text-gray-100"
              }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-[#1e1f22] bg-white dark:bg-[#313338]">
        <div className="max-w-2xl flex gap-2 w-full mx-auto">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message..."
            className="flex-1 px-4 py-2 rounded-md bg-gray-100 dark:bg-[#1e1f22] outline-none text-sm"
          />
          <button
            onClick={send}
            className="px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}
