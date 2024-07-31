"use client";

import { Button } from "@/components/ui/button";
import GridList from "./GridList";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";

const GridViewTemplate = () => {
  const { fetchMyMetrics } = useContext(MetricContext);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium mb-8">Grid View</h1>
        <Button onClick={fetchMyMetrics}>Refresh</Button>
      </div>
      <div className="space-y-8">
        <GridList />
      </div>
    </>
  );
};
export default GridViewTemplate;
