"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";
import DragAndDrop from "../DragDrop";
import { useAuthStore } from "@/app/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "@/lib/api/profile";

export default function ProfileCard() {
  const { user } = useAuthStore();
  const [profileImageUrl, setProfileImageUrl] = useState<string>(
    user?.profile_image || ""
  );
  const [username, setUsername] = useState<string>(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        profile_image: profileImageUrl,
        username: username,
      };
      console.log(user);
      const updatedUser = await updateProfile(user?._id!, payload);
      if (updatedUser) toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-sm" onSubmit={handleProfileUpdate}>
      <h2 className="text-base font-semibold">Update Profile</h2>
      <p className="text-xs mb-2 text-gray-500">
        After update please logout and login to see the changes
      </p>
      <DragAndDrop onChange={setProfileImageUrl} />
      <div className="mt-2" />
      <FormInput
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="e.g Nischal Dahal"
        label="Username"
      />

      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? "Updating..." : "Save Profile"}
      </Button>
    </form>
  );
}
