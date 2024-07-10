"use client";

import CreateReport from "./CreateReport";
import MyReports from "./MyReports";

const MetricViewTemplate = () => {
  return (
    <div className="space-y-8">
      <CreateReport />
      <MyReports />
    </div>
  );
};
export default MetricViewTemplate;
