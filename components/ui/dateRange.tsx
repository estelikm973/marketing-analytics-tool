"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode, useState } from "react";
import {
  DateRangePicker,
  RangeKeyDict,
  DateRangePickerProps,
} from "react-date-range";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function DateRange({
  onChange,
}: {
  onChange?: (start?: string, end?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [datePicker, setDatePicker] = useState<DateRangePickerProps["ranges"]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  function handleDateChange(item: RangeKeyDict) {
    setDatePicker([item]);
    //@ts-ignore
    onChange?.(item.startDate, item.endDate);
  }

  return (
    <DropdownMenuDemo
      trigger={
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          <CalendarDays className="" />
        </Button>
      }
      content={
        <DateRangePicker ranges={datePicker} onChange={handleDateChange} />
      }
    />
  );
}

const DropdownMenuDemo = ({
  trigger,
  content,
}: {
  trigger: ReactNode;
  content: ReactNode;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          style={{
            zIndex: 9999999,
          }}
          className="DropdownMenuContent"
          sideOffset={5}
        >
          <DropdownMenu.Item className="DropdownMenuItem">
            {content}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default DateRange;
