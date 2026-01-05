import Image from "next/image";
import ThemeButton from "../ThemeButton";
import NotificationButton from "../NotifcationButton";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ChatNavbar() {
  return (
    <nav className="w-full bg-gray-50/60 dark:bg-[#2b2d31] shadow-xs px-4 py-3 flex items-center justify-between">
      <Link href={"/"} className="flex items-center mr-5">
        <Image src="/logo.png" alt="logo" width={40} height={40} />
        <span className="text-lg font-semibold">GinChat</span>
      </Link>

      <div className="flex items-center space-x-2">
        <NotificationButton />
        <ThemeButton />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/mouse.png"
                alt="User Profile"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <Link href={"/login"}>
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link href={"/signup"}>
              <DropdownMenuItem>Signup</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
