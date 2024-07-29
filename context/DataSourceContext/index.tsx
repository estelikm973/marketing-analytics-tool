"use client";

import { createContext, useEffect, useState } from "react";
import { IDataSourceContext, IDataSourceContextProvider } from "./types";
import { IDataSource, IDataSourceConnection } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GAConenctForm from "@/modules/dataSources/components/GoogleAnalytics/GAConnectForm";
import { DataSourceKeys } from "@/data/platforms";
import { getDataSources } from "@/actions/datasource";

export const DataSourceContext = createContext<IDataSourceContext>(
  {} as IDataSourceContext
);

export const DataSourceContextProvider: React.FC<
  IDataSourceContextProvider
> = ({ children }) => {
  const [nonConnectedDataSources, setNonConnectedDataSources] = useState<any[]>(
    []
  );
  const [connectedDataSources, setConnectedDataSources] = useState<any[]>([]);

  const [selectedDataSource, setSelectedDataSource] = useState<IDataSource>();
  const [isConnected, setIsConnected] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchDataSources = async () => {
    setLoading(true);
    const res = await getDataSources().finally(() => setLoading(false));

    setConnectedDataSources(res?.connectedDataSources || []);
    setNonConnectedDataSources(res?.nonConnectedDataSources || []);
  };

  const getDialogContent = (dataSource: IDataSource, isConnected: boolean) => {
    switch (dataSource.key) {
      case DataSourceKeys.GOOGLE_ANALYTICS:
        return <GAConenctForm isConnected={isConnected} />;
      default:
        return null;
    }
  };

  const openDialog = (
    selectedDataSource: IDataSource,
    isConnected: boolean
  ) => {
    setSelectedDataSource(selectedDataSource);
    setIsConnected(isConnected);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchDataSources();
  }, []);

  return (
    <DataSourceContext.Provider
      value={{
        connectedDataSources,
        nonConnectedDataSources,
        fetchDataSources,
        openDialog,
        loading,
        setIsConnected,
      }}
    >
      {children}
      <Dialog
        open={selectedDataSource && dialogOpen}
        onOpenChange={(val) => setDialogOpen(val)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedDataSource?.name}</DialogTitle>
          </DialogHeader>
          {selectedDataSource &&
            getDialogContent(selectedDataSource, isConnected)}
        </DialogContent>
      </Dialog>
    </DataSourceContext.Provider>
  );
};
