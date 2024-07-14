"use client";

import { Dispatch, FC, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { platforms } from "@/data/platforms";
import { cn } from "@/lib/utils";

interface ISelectPlatformProps {
  platformName: string;
  setPlatformName: Dispatch<SetStateAction<string>>;
}

const SelectPlatform: FC<ISelectPlatformProps> = ({
  platformName,
  setPlatformName,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {platforms.find((platform) => platform.key === platformName)?.label ||
            "Select platform..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {platforms.length > 0 &&
                platforms.map((platform) => (
                  <CommandItem
                    key={platform.key}
                    value={platform.label || ""}
                    onSelect={(_currentValue) => {
                      setOpen(false);
                      setPlatformName(platform.key);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        platform.key === platformName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {platform.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectPlatform;
