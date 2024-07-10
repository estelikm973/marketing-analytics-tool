"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { IDimension } from "@/lib/types";

interface IDiamensionSelectProps {
  dimensions: IDimension[];
  loading: boolean;
  tempValue: IDimension;
  setTempValue: (tempValue: IDimension) => void;
}

export function DimensionSelect({
  dimensions,
  loading,
  tempValue,
  setTempValue,
}: IDiamensionSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-80 justify-between"
        >
          {tempValue.apiName
            ? dimensions.find(
                (dimension) => dimension.apiName === tempValue.apiName
              )?.uiName
            : "Select dimension..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search dimension..." />
          <CommandList>
            {loading ? (
              <CommandItem disabled className="px-4 py-2">
                Loading...
              </CommandItem>
            ) : (
              <>
                <CommandEmpty>No dimension found.</CommandEmpty>
                <CommandGroup>
                  {dimensions.length > 0 &&
                    dimensions.map((dimension) => (
                      <CommandItem
                        key={dimension.apiName}
                        value={dimension.uiName || ""}
                        onSelect={(_currentValue) => {
                          setTempValue(dimension);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            tempValue?.apiName === dimension.apiName
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {dimension.uiName}
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
}
