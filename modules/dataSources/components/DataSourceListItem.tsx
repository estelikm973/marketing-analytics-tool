import { AreaChart } from "lucide-react";

const DataSourcesListItem = () => {
  return (
    <div className="bg-white size-32 shadow-md p-4">
      <div className="flex items-center justify-center h-2/3">
        <AreaChart className="size-8" />
      </div>
      <div className="text-sm font-medium text-center">Google Analytics</div>
    </div>
  );
};

export default DataSourcesListItem;
