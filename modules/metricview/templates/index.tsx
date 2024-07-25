import { Tab, TabItem } from "@/components/ui/tab";
import CreateMetric from "./CreateMetric";
import MyMetrics from "./MyMetrics";
import ViewManualEntries from "./ManualEntries/ViewManualEntries";
import { manualEntries, metricViewTabOptions } from "@/data/manualEntries";
import CreateManualEntry from "./ManualEntries/CreateManualEntry";
import ManualEntriesTemplate from "./ManualEntries/ManualEntriesTemplate";

const MetricViewTemplate = () => {
  return (
    <div className="space-y-8">
      <Tab headers={metricViewTabOptions}>
        <TabItem>
          <div className="flex items-start flex-col gap-10 bg-white rounded-md p-8">
            {/* <CreateManualEntry /> */}
            <ManualEntriesTemplate />
          </div>
        </TabItem>

        <TabItem>
          <div> this is imported matrics</div>
        </TabItem>

        <TabItem>
          <CreateMetric />
        </TabItem>
      </Tab>
      <MyMetrics />
    </div>
  );
};
export default MetricViewTemplate;
