import Image from "next/image";
import ThemeButton from "../ThemeButton";
import NotificationButton from "../NotifcationButton";

export default function ChatNavbar() {
  return (
    <nav className="w-full bg-gray-50/60 dark:bg-neutral-900 shadow-xs px-4 py-3 flex items-center justify-between">
      <div className="flex items-center mr-5">
        <Image
          className="border rounded-lg shadow-sm"
          src="/logo.png"
          alt="logo"
          width={40}
          height={40}
        />
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <ThemeButton />
        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
          <Image
            src="/mouse.png"
            alt="User Profile"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
