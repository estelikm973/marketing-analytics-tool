"use client";

import EmptyList from "@/modules/common/EmptyList";
import MyMetricItem from "../components/MyMetricItem";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";

const MyMetrics = () => {
  const { myMetrics } = useContext(MetricContext);

  return (
    <div className="bg-white rounded-md p-8">
      <h2 className="text-xl font-medium mb-4">My Metrics</h2>
      <div className="flex gap-4 flex-wrap">
        {!myMetrics.length ? (
          <div className="flex-grow">
            <EmptyList />
          </div>
        ) : (
          myMetrics.map((el) => <MyMetricItem key={el.id} metric={el} />)
        )}
      </div>
    </div>
  );
};

export default MyMetrics;
