import { Metadata } from "next";
import MetricViewTemplate from "@/modules/metricview/templates";

export const metadata: Metadata = {
  title: "Metrics - Marketing Analytics Tool",
};

export default async function MetricsView() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="m-8">
        <h1 className="text-3xl font-medium mb-8">Metrics View</h1>
        <MetricViewTemplate />
      </main>
    </div>
  );
}
