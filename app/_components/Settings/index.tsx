"use client";

import { Button } from "@/components/ui/button";
import FormInput from "../FormInput";

export default function SettingsCard() {
  return (
    <form className="max-w-sm">
      <h2 className="text-base font-semibold">Update Password</h2>
      <p className="text-xs mb-2 text-gray-500">
        After update please logout and login to see the reflect
      </p>
      <FormInput placeholder="e.g **********" label="Old Password" />
      <FormInput placeholder="e.g **********" label="New Password" />
      <Button className="w-full mt-4">Change Password</Button>
    </form>
  );
}
