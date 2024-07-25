"use client";

import { createMetric } from "@/actions/metrics";
import { Button } from "@/components/ui/button";
import DateRange from "@/components/ui/dateRange";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetricContext } from "@/context/MetricsContext";
import { ManualTemplateBoxType } from "@/data/manualEntries";
import { MetricType } from "@/lib/types";
import { useContext, useState } from "react";

function CreateManualEntry({
  entry,
  closeModal,
}: {
  entry: ManualTemplateBoxType;
  closeModal?: () => void;
}) {
  const { fetchMyMetrics } = useContext(MetricContext);

  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState({
    value: 0,
    valueType: "currency",
    from: undefined,
    to: undefined,
  });

  const handleCreate = async () => {
    setLoading(true);

    await createMetric({
      name: entry.label,
      content:
        !content.from || !content.to
          ? { value: content.value, valueType: content.valueType }
          : content,
      show_on_grid: false,
      show_on_table: false,
      metric_type: MetricType.Manual,
    });

    fetchMyMetrics();
    closeModal?.();
    setLoading(false);
  };

  const onChangeHandler = (key: string, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <div className="grid gap-4 py-4 mb-4">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <label
              htmlFor={entry.key}
              className="inline-block text-xs mb-2 text-gray-500"
            >
              Enter the value
            </label>
            <Input
              id={entry.key}
              type="number"
              value={content.value}
              disabled={loading}
              onChange={(e) =>
                onChangeHandler("value", parseInt(e.target.value))
              }
            />
          </div>

          <div className="">
            <label
              htmlFor="valueType"
              className="inline-block text-xs mb-2 text-gray-500"
            >
              Select the Value Type
            </label>
            <SelectValueType
              disabled={loading}
              value={content.valueType}
              onValueChange={(value) => onChangeHandler("valueType", value)}
            />
          </div>
        </div>

        {entry.key === "expense" && (
          <div className="flex items-center gap-6">
            <DateRange
              onChange={(start, end) => {
                onChangeHandler("from", start?.toString());
                onChangeHandler("to", end?.toString());
              }}
            />
          </div>
        )}
      </div>
      <Button onClick={handleCreate} disabled={loading}>
        Save
      </Button>
    </div>
  );
}

function SelectValueType({
  value,
  disabled = false,
  onValueChange,
}: {
  value: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Select value={value} disabled={disabled} onValueChange={onValueChange}>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="currency">Currency ($)</SelectItem>
          <SelectItem value="percent">Percentage (%)</SelectItem>
          <SelectItem value="number">Number</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CreateManualEntry;
