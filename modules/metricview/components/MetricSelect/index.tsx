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
import { IMetric } from "@/lib/types";

interface IMetricSelectProps {
  metrics: IMetric[];
  selectedMetrics: IMetric[];
  loading: boolean;
  tempValue: IMetric;
  setTempValue: (tempValue: IMetric) => void;
}

export function MetricSelect({
  metrics,
  loading,
  tempValue,
  setTempValue,
  selectedMetrics,
}: IMetricSelectProps) {
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
            ? metrics.find((metric) => metric.apiName === tempValue.apiName)
                ?.uiName
            : "Select metric..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search metric..." />
          <CommandList>
            {loading ? (
              <CommandItem disabled className="px-4 py-2">
                Loading...
              </CommandItem>
            ) : (
              <>
                <CommandEmpty>No metric found.</CommandEmpty>
                <CommandGroup>
                  {metrics.length > 0 &&
                    metrics.map((metric) => (
                      <CommandItem
                        key={metric.apiName}
                        value={metric.uiName || ""}
                        onSelect={(_currentValue) => {
                          setTempValue(metric);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMetrics?.some(
                              (selectedMetric) =>
                                selectedMetric.apiName === metric.apiName
                            )
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {metric.uiName}
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
