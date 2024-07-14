"use client";

import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { createMetric } from "@/actions/metrics";
import SelectPlatform from "../components/SelectPlatform";
import SelectGAMetric from "../components/SelectGAMetric";
import { MetricContext } from "@/context/MetricsContext";

const CreateMetric = () => {
  const { fetchMyMetrics } = useContext(MetricContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [showOnGrid, setShowOnGrid] = useState(false);
  const [showOnTable, setShowOnTable] = useState(false);
  const [platformName, setPlatformName] = useState("");
  const [metricKey, setMetricKey] = useState("");

  const handleCreate = async () => {
    setLoading(true);

    await createMetric({
      name,
      show_on_grid: showOnGrid,
      show_on_table: showOnTable,
      source_platform: platformName,
      metric_key: metricKey,
    });

    setLoading(false);
    fetchMyMetrics();
  };

  useEffect(() => {
    setMetricKey("");
  }, [platformName]);

  return (
    <div className="bg-white rounded-md p-8">
      <div className="w-80">
        <h2 className="text-xl font-medium mb-4">Create Metric</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="metric-name" className="text-xs mb-2 text-gray-500">
              Name
            </label>
            <Input
              id="metric-name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              type="text"
            />
          </div>
          <div className="grid grid-cols-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="grid-check"
                checked={showOnGrid}
                onCheckedChange={(checked) =>
                  typeof checked === "boolean" && setShowOnGrid(checked)
                }
              />
              <label
                htmlFor="grid-check"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Grid
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="table-check"
                checked={showOnTable}
                onCheckedChange={(checked) =>
                  typeof checked === "boolean" && setShowOnTable(checked)
                }
              />
              <label
                htmlFor="table-check"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Table
              </label>
            </div>
          </div>
          <div>
            <div className="text-xs mb-2 text-gray-500">Platform</div>
            <SelectPlatform
              platformName={platformName}
              setPlatformName={setPlatformName}
            />
          </div>
          {platformName === "google-analytics" && (
            <div>
              <div className="text-xs mb-2 text-gray-500">Metric</div>
              <SelectGAMetric
                metricKey={metricKey}
                setMetricKey={setMetricKey}
              />
            </div>
          )}
          <div>
            <Button disabled={loading} className="px-8" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateMetric;
