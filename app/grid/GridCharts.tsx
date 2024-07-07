import { getGridData } from "@/actions/grid";
import GridChart from "@/components/Charts/GridChart";

const GridCharts = async () => {
  const gridData = await getGridData();

  if (!gridData) {
    return null;
  }
  return (
    <div className="bg-white w-52">
      <h2 className="bg-orange-400 h-9 flex items-center justify-center font-bold">
        {gridData.yLabel}
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

export default GridCharts;
