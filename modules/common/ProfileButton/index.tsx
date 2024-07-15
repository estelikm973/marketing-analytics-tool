import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoutButton } from "@/modules/auth/LogoutButton";

export function ProfileButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-gray-300 hover:bg-gray-400 p-4" variant="ghost">
          Admin
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-52">
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
}
