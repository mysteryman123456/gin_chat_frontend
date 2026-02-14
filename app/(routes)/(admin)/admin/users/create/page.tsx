"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DragAndDrop from "@/app/_components/_Navbar/DragDrop";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUser } from "@/lib/api/admin";

export default function AdminCreateUser() {
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      await createUser({
        ...form,
        profile_image: profileImage,
      });
      toast.success("User created successfully");
      setForm({ username: "", email: "", password: "" });
      setProfileImage("");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4  max-w-3xl rounded-xl border p-4 dark:border-neutral-800">
      <DragAndDrop onChange={setProfileImage} />

      <Input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

      <Input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </Button>
    </div>
  );
}
