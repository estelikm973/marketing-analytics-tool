"use client";

import GridList from "./GridList";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";
import MonthPicker from "@/modules/common/MonthPicker";
import { Button } from "@/components/ui/button";

const GridViewTemplate = () => {
  const { filterDate, setFilterDate, fetchMyMetrics } =
    useContext(MetricContext);

  return (
    <div>
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
        <GridList />
      </div>
    </div>
  );
};
export default GridViewTemplate;
