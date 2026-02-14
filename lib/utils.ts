import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SendFileType } from "./api/upload";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fileFormats: Record<SendFileType, string[]> = {
  IMAGE: ["jpg", "png", "jpeg", "webp"],
  VIDEO: ["mp4", "mov", "avi", "mkv"],
  AUDIO: ["mp3", "wav", "aac", "mpeg"],
  FILE: ["pdf", "doc", "docx", "txt", "csv", "plain", "zip"],
  TEXT: ["txt"],
};

export const getFileTypeFromUploadedFile = (mimeType: string): SendFileType => {
  if (!mimeType.trim() || mimeType.trim().length <= 0)
    throw new Error("Unsupported file type");
  const extension = mimeType.split("/")[1].toLowerCase();
  for (const [mainType, extensions] of Object.entries(fileFormats)) {
    if (extensions.map((e) => e.toLowerCase()).includes(extension)) {
      return mainType as SendFileType;
    }
  }
  throw new Error("Unsupported file type");
};

export const saveLastMessageToLocalStorage = (
  conversationId: string,
  message: string
) => {
  if (!conversationId || !message) return;
  const key = `last_message_${conversationId}`;
  const value = message;
  localStorage.setItem(key, value);
};

export const getLastMessageFromLocalStorage = (conversationId: string) => {
  const key = `last_message_${conversationId}`;
  const value = localStorage.getItem(key);
  return value;
};

export function timeAgo(timestamp: string | number | Date): string {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();
  const diffSeconds = Math.floor((now - time) / 1000);

  if (diffSeconds < 10) return "just now";
  if (diffSeconds < 60) return `${diffSeconds} s ago`;
  if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
  if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hrs ago`;
  if (diffSeconds < 604800)
    return `${Math.floor(diffSeconds / 86400)} days ago`;
  if (diffSeconds < 2419200)
    return `${Math.floor(diffSeconds / 604800)} weeks ago`;

  // fallback
  const date = new Date(timestamp);
  return date.toLocaleDateString();
}
