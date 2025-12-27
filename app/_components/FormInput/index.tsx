"use client";

import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export default function FormInput({ label, error, ...props }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <Input {...props} />
      {error && <p className="text-sm text-red-700">{error.message}</p>}
    </div>
  );
}
