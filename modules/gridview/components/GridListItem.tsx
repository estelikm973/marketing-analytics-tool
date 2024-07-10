import { getGridData } from "@/actions/analytics";
import GridChart from "@/components/Charts/GridChart";
import { IReportItemSettings } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

interface IGridListItemProps {
  reportSettings: IReportItemSettings;
}

const GridListItem: React.FC<IGridListItemProps> = ({ reportSettings }) => {
  const [gridData, setGridData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchGridData = useCallback(async () => {
    setLoading(true);
    const data = await getGridData(
      reportSettings.dimensions,
      reportSettings.metrics
    );
    console.log(data)
    if (!data) return;
    setGridData(data);
    setLoading(false);
  }, [reportSettings]);

  useEffect(() => {
    fetchGridData();
  }, [reportSettings, fetchGridData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!gridData) return null;

  return (
    <div className="bg-white w-52 shadow-md">
      <h2 className="bg-orange-400 h-9 flex items-center justify-center font-bold">
        {reportSettings.name}
      </h2>
      <div className="h-44 grid grid-rows-2">
        <div className="flex items-center justify-center font-bold text-2xl">
          {gridData.metricTotal}
        </div>
        <GridChart
          data={gridData.data}
          xDataKey={gridData?.xDataKey}
          yDataKey={gridData?.yDataKey}
          xLabel={gridData.xLabel}
          yLabel={gridData.yLabel}
        />
      </div>
    </div>
  );
};

export default GridListItem;
