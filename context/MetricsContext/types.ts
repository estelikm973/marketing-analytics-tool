import { Dispatch } from "react";
import { IDataTableProps } from "@/components/DataTable";
import { IGridItem, IMetric } from "@/lib/types";

export interface IMetricContextProvider {
  children: React.ReactNode;
}

export interface IMetricContext {
  myMetrics: IMetric[];
  fetchMyMetrics: () => Promise<void>;
  tableData: IDataTableProps | undefined;
  gridData: IGridItem[];
  gridLoading: boolean;
  tableLoading: boolean;
  metricsLoading: boolean;
  updateMetric: (
    id: string,
    data: {
      show_on_table?: boolean;
      show_on_grid?: boolean;
    }
  ) => Promise<void>;
  deleteMetric: (id: string) => Promise<void>;
  openAddMetricsConnectionDialog: (metric: IMetric) => void;
  closeDialog: () => void;
}
