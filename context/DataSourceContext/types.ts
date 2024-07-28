import { IDataSource, IDataSourceConnection } from "@/lib/types";
import React, { Dispatch } from "react";

export interface IDataSourceContextProvider {
  children: React.ReactNode;
}

export interface IDataSourceContext {
  nonConnectedDataSources: IDataSource[];
  connectedDataSources: IDataSourceConnection[];
  fetchDataSources: () => Promise<void>;
  openDialog: (selectedDataSource: IDataSource, isConnected: boolean) => void;
  loading: boolean;
  setIsConnected: Dispatch<React.SetStateAction<boolean>>;
}
