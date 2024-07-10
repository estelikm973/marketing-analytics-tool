"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IReportTypeSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const ReportTypeSelect: React.FC<IReportTypeSelectProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="grid">Grid</SelectItem>
          <SelectItem value="table">Table</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReportTypeSelect;
