import GridChart from "@/components/Charts/GridChart";
import { IGridItem } from "@/lib/types";

interface IGridListItemProps {
  gridData: IGridItem;
}

const GridListItem: React.FC<IGridListItemProps> = ({ gridData }) => {
  const { data, label } = gridData;

  return (
    <div className="bg-white w-52 shadow-md">
      <h2 className="bg-orange-400 h-9 flex items-center justify-center font-bold">
        {label}
      </h2>
      <div className="h-44 grid grid-rows-2">
        <div className="flex items-center justify-center font-bold text-2xl">
          {isNaN(Number(data.metricTotal))
            ? data.metricTotal
            : parseFloat(Number(data.metricTotal).toFixed(2))}
        </div>
        <GridChart
          data={data.data}
          xDataKey={data?.xDataKey}
          yDataKey={data?.yDataKey}
          xLabel={data.xLabel}
          yLabel={data.yLabel}
        />
      </div>
    </div>
  );
};

export default GridListItem;
