"use client";

import { Dispatch, FC, useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { getAccountList } from "@/actions/datasource";
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
import { IAccount } from ".";

interface IAccountSelectProps {
  accountName: string;
  setAccountName: Dispatch<React.SetStateAction<string>>;
}

const AccountSelect: FC<IAccountSelectProps> = ({
  accountName,
  setAccountName,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountList, setAccountList] = useState<IAccount[]>([]);

  const fetchAccountList = async () => {
    setLoading(true);

    const res = await getAccountList();

    if (res) {
      if (accountName && !res.some((el) => el.name === accountName)) {
        setAccountName("");
      }
      setAccountList(res || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAccountList();
  }, []);

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
            : accountList?.find((el) => el.name === accountName)?.displayName ||
              "Select Account"}
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
                  {accountList.length > 0 &&
                    accountList.map((el) => (
                      <CommandItem
                        key={el.name}
                        value={el.displayName || ""}
                        onSelect={(_currentValue) => {
                          setOpen(false);
                          setAccountName(el.name);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            el.name === accountName
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

export default AccountSelect;
