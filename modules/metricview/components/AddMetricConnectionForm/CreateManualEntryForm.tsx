"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addManualEntry } from "@/actions/metrics";

interface ICreateManualEntryFormProps {
  metric_id: string;
  closeDialog: () => void;
}

const CreateManualEntryForm: FC<ICreateManualEntryFormProps> = ({
  metric_id,
  closeDialog,
}) => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [value, setValue] = useState(0);
  const [format, setFormat] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!metric_id || !value || !format || !date?.from || !date?.to) return;

    setLoading(true);

    const res = await addManualEntry(
      metric_id,
      value,
      format,
      date?.from,
      date?.to
    );

    setLoading(false);

    if (res?.id) {
      closeDialog();
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="date">Date Range</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {dayjs(date.from).format("MMMM DD, YYYY")}-{" "}
                    {dayjs(date.to).format("MMMM DD, YYYY")}
                  </>
                ) : (
                  dayjs(date.from).format("MMMM DD, YYYY")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          placeholder="Enter a number"
          required
          value={value}
          onChange={(event) => setValue(Number(event.currentTarget.value))}
        />
      </div>
      <div className="grid gap-2">
        <div className="text-sm font-medium">Format</div>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a format" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="number">Plain Number</SelectItem>
              <SelectItem value="money">Money</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={loading} type="button" onClick={handleSubmit}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>Save</>
        )}
      </Button>
    </div>
  );
};

export default CreateManualEntryForm;
