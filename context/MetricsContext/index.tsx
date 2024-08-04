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
import dayjs from "dayjs";

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
  const [filterDate, setFilterDate] = useState<Date>(new Date());

  const fetchGridData = useCallback(async () => {
    if (!filterDate) return;

    const res = await getGridData(dayjs(filterDate).format("YYYY-MM-DD"));

    if (res) {
      setGridData(res);
    }
  }, [filterDate]);

  const fetchTableData = useCallback(async () => {
    if (!filterDate) return;

    const res = await getTableData(dayjs(filterDate).format("YYYY-MM-DD"));

    if (res) {
      setTableData(res);
    }
  }, [filterDate]);

  const fetchMyMetrics = useCallback(async () => {
    setMetricsLoading(true);
    setTableLoading(true);
    setGridLoading(true);

    const res = await getMyMetrics();

    if (res) {
      setMyMetrics(res);
    }
    setMetricsLoading(false);

    fetchTableData().finally(() => setTableLoading(false));
    fetchGridData().finally(() => setGridLoading(false));
  }, [fetchGridData, fetchTableData]);

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
  }, [fetchMyMetrics, filterDate]);

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
        closeDialog,
        filterDate,
        setFilterDate,
      }}
    >
      {children}
      {selectedMetric && (
        <Dialog
          open={addMetricsConnectionDialogOpen}
          onOpenChange={(val) => setAddMetricsConnectionDialogOpen(val)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedMetric.name}</DialogTitle>
            </DialogHeader>
            <AddMetricConnectionForm metric={selectedMetric} />
          </DialogContent>
        </Dialog>
      )}
    </MetricContext.Provider>
  );
};
