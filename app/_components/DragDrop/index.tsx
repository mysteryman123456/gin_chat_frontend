"use client";

import { uploadImage } from "@/lib/api/upload";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface DragAndDropProps {
  onChange: (imageUrl: string) => void;
}

export default function DragAndDrop({ onChange }: DragAndDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateFile = (file: File) => {
    const allowedTypes = ["image/png", "image/jpg", "image/webp", "image/jpeg"];
    const maxSize = 3 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only png, webp and jpg files are allowed");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File size must be under 3MB");
      return false;
    }

    return true;
  };

  const handleFile = async (file: File) => {
    if (!validateFile(file)) return;

    try {
      setLoading(true);
      const tempPreview = URL.createObjectURL(file);
      setPreview(tempPreview);
      const res = await uploadImage(file);
      const imageUrl = res.data.image_url;
      setPreview(imageUrl);
      onChange(imageUrl);
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
      setPreview(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`
        cursor-pointer
        flex flex-col items-center gap-2
        rounded-xl p-4 border-2 border-dashed
        ${loading ? "opacity-60 pointer-events-none" : ""}
        border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />

      <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-indigo-600 text-white relative">
        {preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="object-cover w-full h-full"
            />
          </>
        ) : (
          <ImagePlus size={40} />
        )}
      </div>

      <h2 className="text-sm text-center font-semibold text-gray-600 dark:text-gray-300">
        {loading ? "Uploading image" : "Browse to upload your image file"}
      </h2>
      <p className="text-xs text-gray-500">PNG, JPG, JPEG, WEBP • Max 3MB</p>
    </div>
  );
}
