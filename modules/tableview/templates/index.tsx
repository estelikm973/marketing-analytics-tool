"use client";

import { Button } from "@/components/ui/button";
import TableList from "./TableList";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";

const TableViewTemplate = () => {
  const { fetchMyMetrics } = useContext(MetricContext);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium mb-8">Table View</h1>
        <Button onClick={fetchMyMetrics}>Refresh</Button>
      </div>
      <div className="space-y-8">
        <TableList />
      </div>
    </>
  );
};
export default TableViewTemplate;
