import { FC } from "react";
import { AreaChart } from "lucide-react";
import { IDataSource } from "@/lib/types";

interface IDataSourceListItemProps {
  dataSource: IDataSource;
  onClick: (dataSource: IDataSource) => void;
}

const DataSourcesListItem: FC<IDataSourceListItemProps> = ({
  dataSource,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(dataSource)}
      className="bg-white size-32 shadow-md p-4 hover:cursor-pointer"
    >
      <div className="flex items-center justify-center h-2/3">
        <AreaChart className="size-8" />
      </div>
      <div className="text-sm font-medium text-center">{dataSource.name}</div>
    </div>
  );
};

export default DataSourcesListItem;
