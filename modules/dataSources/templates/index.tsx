"use client";

import { useContext } from "react";
import { IDataSource } from "@/lib/types";
import { DataSourceContext } from "@/context/DataSourceContext";
import DataSourcesListItem from "../components/DataSourceListItem";

const DataSourcesTemplate = () => {
  const { connectedDataSources, nonConnectedDataSources, openDialog, loading } =
    useContext(DataSourceContext);

  const handleClick = (dataSource: IDataSource, isConnected: boolean) => {
    openDialog(dataSource, isConnected);
  };

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold mb-4">API Connections</h2>
        <div className="w-full">
          <div className="flex gap-6">
            {nonConnectedDataSources.map((dataSource) => (
              <DataSourcesListItem
                key={dataSource.id}
                dataSource={dataSource}
                onClick={(dataSource) => handleClick(dataSource, false)}
              />
            ))}
          </div>
        </div>
      </div>
      <hr className="border-b-2 border-black" />
      <div>
        <h2 className="font-semibold mb-4">My Data Sources</h2>
        <div className="flex gap-6">
          {connectedDataSources.map((dataSourceConnection) => (
            <DataSourcesListItem
              key={dataSourceConnection.id}
              dataSource={dataSourceConnection.data_source}
              onClick={(dataSource) => handleClick(dataSource, true)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default DataSourcesTemplate;
