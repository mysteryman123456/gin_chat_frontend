"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/lib/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import UserCard, { UserCardSkeleton, UserNotFoundCard } from "./UserCard";

export type SearchedUserType = {
  email: string;
  username: string;
  profile_image: string;
  _id: string;
};

export function SearchUserDialog() {
  const [searchedUser, setSearchedUser] = useState("");
  const [debouncedUser, setDebouncedUser] = useState("");

  useEffect(() => {
    const handler = setTimeout(
      () => setDebouncedUser(searchedUser.trim()),
      400
    );
    return () => clearTimeout(handler);
  }, [searchedUser]);

  const { data, isLoading } = useQuery({
    queryKey: ["users", debouncedUser],
    enabled: !!debouncedUser,
    staleTime: 2 * 60 * 1000,
    queryFn: async () => fetcher<SearchedUserType[]>(`/user/${debouncedUser}`),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="group rounded-full cursor-pointer bg-neutral-200/60 text-black dark:bg-neutral-700 dark:text-white hover:bg-neutral-200/60 hover:text-black"
          size={"icon-lg"}
        >
          <UserRoundPlus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Users</DialogTitle>
          <DialogDescription>
            Click on add user button if you want to message that specific user.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            value={searchedUser}
            onChange={(e) => setSearchedUser(e.target.value)}
            placeholder="e.g Search via email"
            type="text"
          />
          <div className="no-scrollbar mt-4 max-h-[50vh] overflow-y-auto flex flex-col gap-2">
            {isLoading && <UserCardSkeleton />}

            {!isLoading &&
              data &&
              data.map((user) => <UserCard key={user.email} data={user} />)}

            {!isLoading && data?.length === 0 && <UserNotFoundCard />}
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
