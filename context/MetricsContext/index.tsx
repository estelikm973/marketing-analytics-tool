"use client";

import { createContext, useCallback, useEffect, useState } from "react";
import { IMetricContext, IMetricContextProvider } from "./types";
import { IGridItem, IMetric } from "@/lib/types";
import {
  deleteMetricById,
  getMyMetrics,
  updateMetricById,
} from "@/actions/metrics";
import { getTableData } from "@/actions/table";
import { IDataTableProps } from "@/components/DataTable";
import { getGridData } from "@/actions/grid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddMetricConnectionForm from "@/modules/metricview/components/AddMetricConnectionForm";

export const MetricContext = createContext<IMetricContext>(
  {} as IMetricContext
);

export const MetricContextProvider: React.FC<IMetricContextProvider> = ({
  children,
}) => {
  const [myMetrics, setMyMetrics] = useState<IMetric[]>([]);
  const [tableData, setTableData] = useState<IDataTableProps>();
  const [gridData, setGridData] = useState<IGridItem[]>([]);
  const [gridLoading, setGridLoading] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(false);
  const [metricsLoading, setMetricsLoading] = useState<boolean>(false);
  const [addMetricsConnectionDialogOpen, setAddMetricsConnectionDialogOpen] =
    useState<boolean>(false);

  const [selectedMetric, setSelectedMetric] = useState<IMetric>();

  const fetchMyMetrics = useCallback(async () => {
    setMetricsLoading(true);
    setTableLoading(true);
    setGridLoading(true);

    const res = await getMyMetrics();

    if (res) {
      setMyMetrics(res);
    }
    setMetricsLoading(false);

    fetchTableData();
    fetchGridData();
  }, []);

  const fetchTableData = async () => {
    const res = await getTableData();

    if (res) {
      setTableData(res);
    }

    setTableLoading(false);
  };

  const fetchGridData = async () => {
    const res = await getGridData();

    if (res) {
      setGridData(res);
    }

    setGridLoading(false);
  };

  const updateMetric = async (
    id: string,
    data: {
      show_on_table?: boolean;
      show_on_grid?: boolean;
    }
  ) => {
    setMetricsLoading(true);

    await updateMetricById(id, data);

    fetchMyMetrics();
  };

  const deleteMetric = async (id: string) => {
    setMetricsLoading(true);

    await deleteMetricById(id);

    fetchMyMetrics();
  };

  const openAddMetricsConnectionDialog = (selectedMetric: IMetric) => {
    setSelectedMetric(selectedMetric);
    setAddMetricsConnectionDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedMetric(undefined);
    setAddMetricsConnectionDialogOpen(false);
  };

  useEffect(() => {
    fetchMyMetrics();
  }, [fetchMyMetrics]);

  return (
    <MetricContext.Provider
      value={{
        myMetrics,
        fetchMyMetrics,
        tableData,
        gridData,
        gridLoading,
        tableLoading,
        metricsLoading,
        deleteMetric,
        updateMetric,
        openAddMetricsConnectionDialog,
      }}
    >
      {children}
      <Dialog
        open={selectedMetric && addMetricsConnectionDialogOpen}
        onOpenChange={(val) => setAddMetricsConnectionDialogOpen(val)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedMetric?.name}</DialogTitle>
          </DialogHeader>
          <AddMetricConnectionForm
            metric_id={selectedMetric?.id || ""}
            closeDialog={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </MetricContext.Provider>
  );
};
