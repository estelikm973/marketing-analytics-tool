"use client";

import { Button } from "@/components/ui/button";
import TableList from "./TableList";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";
import MonthPicker from "@/modules/common/MonthPicker";

const TableViewTemplate = () => {
  const { filterDate, setFilterDate, fetchMyMetrics } =
    useContext(MetricContext);

  return (
    <div>
      <h1 className="sr-only">Table View</h1>
      <div className="flex justify-between">
        <Button onClick={fetchMyMetrics}>Refresh</Button>
        <div className="w-60 mb-4">
          <MonthPicker
            currentMonth={filterDate}
            onMonthChange={setFilterDate}
          />
        </div>
      </div>
      <div className="space-y-8">
        <TableList />
      </div>
    </div>
  );
};
export default TableViewTemplate;
