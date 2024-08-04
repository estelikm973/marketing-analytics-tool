"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { IManualDataSource } from "@/lib/types";
import { getManualDataSources } from "@/actions/datasource";

interface ISelectManualDataSourceProps {
  manualDataSourceId: string;
  setManualDataSourceId: Dispatch<SetStateAction<string>>;
}

const ManualDataSourceSelect: FC<ISelectManualDataSourceProps> = ({
  manualDataSourceId,
  setManualDataSourceId,
}) => {
  const [manualDataSourceList, setManualDataSourceList] = useState<
    IManualDataSource[]
  >([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchManualDataSources = async () => {
    setLoading(true);

    const res = await getManualDataSources();

    if (res) {
      setManualDataSourceList(res);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchManualDataSources();
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
          {manualDataSourceList?.find((el) => el.id === manualDataSourceId)
            ?.name || "Select Data Source"}
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
                  {manualDataSourceList.length > 0 &&
                    manualDataSourceList.map((el) => (
                      <CommandItem
                        key={el.id}
                        value={el.name || ""}
                        onSelect={(_currentValue) => {
                          setOpen(false);
                          setManualDataSourceId(el.id);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            el.id === manualDataSourceId
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {el.name || "-"}
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

export default ManualDataSourceSelect;
