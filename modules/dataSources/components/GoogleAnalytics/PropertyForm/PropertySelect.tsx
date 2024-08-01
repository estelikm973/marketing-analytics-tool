"use client";

import { Dispatch, FC, useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { getPropertyList } from "@/actions/datasource";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

interface IPropertySelectProps {
  accountName: string;
  propertyName: string;
  setPropertyName: Dispatch<React.SetStateAction<string>>;
}

interface IProperty {
  displayName: string;
  name: string;
}

const PropertySelect: FC<IPropertySelectProps> = ({
  accountName,
  propertyName,
  setPropertyName,
}) => {
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPropertyList = async (accountName: string) => {
    if (!accountName) return;

    setLoading(true);
    const res = await getPropertyList(accountName);
    setLoading(false);

    if (res) {
      if (propertyName && !res.some((el) => el.name === propertyName)) {
        setPropertyName("");
      }
      setPropertyList(res || []);
    }
  };

  useEffect(() => {
    fetchPropertyList(accountName);
  }, [accountName]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {loading
            ? "Loading..."
            : propertyList?.find((el) => el.name === propertyName)
                ?.displayName || "Select Property"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {loading ? (
              <CommandItem disabled className="px-4 py-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </CommandItem>
            ) : (
              <>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {propertyList.length > 0 &&
                    propertyList.map((el) => (
                      <CommandItem
                        key={el.name}
                        value={el.displayName || ""}
                        onSelect={(_currentValue) => {
                          setOpen(false);
                          setPropertyName(el.name);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            el.name === propertyName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {el.displayName || "-"}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PropertySelect;
