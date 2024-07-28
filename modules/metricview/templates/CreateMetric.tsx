"use client";

import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createMetric } from "@/actions/metrics";

import { MetricContext } from "@/context/MetricsContext";

const CreateMetric = () => {
  const { fetchMyMetrics } = useContext(MetricContext);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");

  const handleCreate = async () => {
    setLoading(true);

    await createMetric({
      name,
    });

    setLoading(false);
    fetchMyMetrics();
  };

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
