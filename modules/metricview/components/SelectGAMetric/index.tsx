"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
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
import { IGAMetric } from "@/lib/types";
import { getCompatibleDimensionsAndMetrics } from "@/actions/analytics";

interface ISelectGAMetricProps {
  metricKey: string;
  setMetricKey: Dispatch<SetStateAction<string>>;
  defaultMetricKey: string;
}

const SelectGAMetric: FC<ISelectGAMetricProps> = ({
  metricKey,
  setMetricKey,
  defaultMetricKey,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gaMetrics, setGAMetrics] = useState<IGAMetric[]>([]);

  const getMetrics = useCallback(async () => {
    setLoading(true);
    const res = await getCompatibleDimensionsAndMetrics(["date"], []);
    const metrics = res?.[0].metricCompatibilities;
    if (metrics?.length) {
      setGAMetrics(
        metrics.map((el) => ({
          apiName: el.metricMetadata?.apiName,
          uiName: el.metricMetadata?.uiName,
        })) || []
      );
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getMetrics();
  }, [getMetrics]);

  useEffect(() => {
    if (
      defaultMetricKey &&
      gaMetrics.length > 0 &&
      gaMetrics.some((el) => el.apiName === defaultMetricKey)
    ) {
      setMetricKey(defaultMetricKey);
    }
  }, [defaultMetricKey, gaMetrics, setMetricKey]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {metricKey
            ? gaMetrics.find((metric) => metric.apiName === metricKey)?.uiName
            : "Select Metric"}
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
                  {gaMetrics.length > 0 &&
                    gaMetrics.map((metric) => (
                      <CommandItem
                        key={metric.apiName}
                        value={metric.uiName || ""}
                        onSelect={(_currentValue) => {
                          setOpen(false);
                          setMetricKey(metric.apiName || "");
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            metric.apiName === metricKey
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
};

export default SelectGAMetric;
