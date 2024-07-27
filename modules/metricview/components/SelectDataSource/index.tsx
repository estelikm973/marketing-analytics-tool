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
import { IDataSourceConnection } from "@/lib/types";
import { getMyDataSourceConnections } from "@/actions/datasource";

interface ISelectDataSourceProps {
  dataSourceKey: string;
  setDataSourceKey: Dispatch<SetStateAction<string>>;
}

const SelectDataSource: FC<ISelectDataSourceProps> = ({
  dataSourceKey,
  setDataSourceKey,
}) => {
  const [myConnections, setMyConnections] = useState<IDataSourceConnection[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDataSources = async () => {
    setLoading(true);

    const res = await getMyDataSourceConnections();

    if (res) {
      setMyConnections(res);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDataSources();
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
          {myConnections?.find((el) => el.data_source_key === dataSourceKey)
            ?.data_source.name || "Select Platform"}
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
                  {myConnections.length > 0 &&
                    myConnections.map((el) => (
                      <CommandItem
                        key={el.id}
                        value={el.data_source.name || ""}
                        onSelect={(_currentValue) => {
                          setOpen(false);
                          setDataSourceKey(el.data_source_key);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            el.data_source_key === dataSourceKey
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {el.data_source.name || "-"}
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

export default SelectDataSource;
