"use client";
import { useState } from "react";

export default function userSignup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleValidate = (data: Record<string, string>): boolean => {
    let isValid = true;

    Object.values(data).forEach((value) => {
      if (!value || value.trim().length === 0) {
        isValid = false;
      }
    });
    return isValid;
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    const isSuccess = handleValidate(form);
    if (!isSuccess) return alert("False");
    alert(JSON.stringify(form) + "\n" + "Registration successful");
  };

  return { handleChange, handleSubmit };
}
