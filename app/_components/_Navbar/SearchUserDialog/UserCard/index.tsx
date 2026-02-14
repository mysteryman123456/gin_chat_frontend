"use client";

import { useState } from "react";
import { SearchedUserType } from "..";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createConversation } from "@/lib/api/conversation";
import { MessageCirclePlus } from "lucide-react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import ToggleSwitch from "@/app/_components/ToggleSwitch";
import { useQueryClient } from "@tanstack/react-query";

export default function UserCard({ data }: { data: SearchedUserType }) {
  const [isGroup, setIsGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const queryClient = useQueryClient();
  const sendMessageAndCreate = async () => {
    try {
      const payload: {
        type: "SINGLE" | "GROUP";
        user_id: string;
        group_name: string | null | undefined;
      } = {
        type: isGroup ? "GROUP" : "SINGLE",
        user_id: data._id,
        group_name: null,
      };

      if (isGroup) {
        if (!groupName.trim()) {
          return toast.error("Group name is required");
        }
        payload.group_name = groupName;
      }

      const res = await createConversation(payload);

      if (res) {
        queryClient.invalidateQueries({
          queryKey: ["messagedusers"],
        });
        return toast.success("Conversation created successfully!");
      }
    } catch (err: any) {
      toast.error("Failed to create conversation");
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border-b hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            {data.profile_image ? (
              <AvatarImage src={data.profile_image} alt={data.username} />
            ) : (
              <AvatarFallback>{data.username[0]}</AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{data.username}</p>
            <p className="text-sm text-gray-500">{data.email}</p>
          </div>
        </div>

        <Button
          variant={"outline"}
          size="icon-sm"
          onClick={sendMessageAndCreate}
        >
          <MessageCirclePlus />
        </Button>
      </div>

      <div className="dark:text-gray-300 text-gray-500 flex justify-between items-center px-0 gap-2 mb-2 text-sm cursor-pointer">
        <span>Create a group and add this user</span>
        <ToggleSwitch id="123" onChange={setIsGroup} checked={isGroup} />
      </div>

      {isGroup && (
        <Input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      )}
    </div>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-2 py-2 rounded-md">
      <Skeleton className="w-10 h-10 rounded-full bg-gray-300 dark:bg-neutral-700" />
      <div className="flex flex-col gap-1 flex-1">
        <Skeleton className="w-32 h-3 rounded bg-gray-300 dark:bg-neutral-700" />
        <Skeleton className="w-48 h-3 rounded bg-gray-300 dark:bg-neutral-700" />
      </div>
    </div>
  );
}

export function UserNotFoundCard() {
  return (
    <div className="flex items-center gap-2 p-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-950">
      <div>
        <p className="font-semibold text-red-700 dark:text-red-400">
          User Not Found
        </p>
        <p className="text-sm text-red-600 dark:text-red-300 mt-0.5">
          This user doesn't exist or has been removed
        </p>
      </div>
    </div>
  );
}
