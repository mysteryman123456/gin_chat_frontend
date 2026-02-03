import { LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="p-4 w-full flex items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}
