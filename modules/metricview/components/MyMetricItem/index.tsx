"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MetricContext } from "@/context/MetricsContext";
import { IMetric } from "@/lib/types";
import { CirclePlusIcon, Trash2 } from "lucide-react";
import { FC, useContext } from "react";

interface IMyMetricItemProps {
  metric: IMetric;
}

const MyMetricItem: FC<IMyMetricItemProps> = ({ metric }) => {
  const { name, show_on_grid, show_on_table, connections, id } = metric;
  const {
    deleteMetric,
    metricsLoading,
    updateMetric,
    openAddMetricsConnectionDialog,
  } = useContext(MetricContext);

  return (
    <div className="border rounded-md shadow-md p-4 col-span-1 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-medium">{name}</h3>
        <Button
          disabled={metricsLoading}
          onClick={() => deleteMetric(id)}
          className="size-6"
          variant="ghost"
          size="icon"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={async (checked) => {
              if (typeof checked === "boolean") {
                await updateMetric(id, { show_on_grid: checked });
              }
            }}
            checked={show_on_grid}
          />
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Grid
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            onCheckedChange={async (checked) => {
              if (typeof checked === "boolean") {
                await updateMetric(id, { show_on_table: checked });
              }
            }}
            checked={show_on_table}
          />
          <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Table
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-600">
          Connections: {connections?.length || 0}
        </div>
        <Button
          onClick={() => openAddMetricsConnectionDialog(metric)}
          className="rounded-full text-gray-600 size-6"
          variant="ghost"
          size="icon"
        >
          <CirclePlusIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MyMetricItem;
