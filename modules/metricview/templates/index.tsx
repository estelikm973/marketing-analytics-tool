import CreateMetric from "./CreateMetric";
import MyMetrics from "./MyMetrics";

const MetricViewTemplate = () => {
  return (
    <div className="space-y-8">
      <CreateMetric />
      <MyMetrics />
    </div>
  );
};
export default MetricViewTemplate;
