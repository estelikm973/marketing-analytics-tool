"use client";

import EmptyList from "@/modules/common/EmptyList";
import { useContext } from "react";
import { MetricContext } from "@/context/MetricsContext";
import DataTable from "@/components/DataTable";

const TableList = () => {
  const { tableData, tableLoading } = useContext(MetricContext);

  return (
    <div className="bg-white rounded-md p-8 w-full">
      {!tableLoading && tableData ? (
        <DataTable
          tableHead={tableData.tableHead}
          tableBody={tableData.tableBody}
          tableFoot={tableData.tableFoot}
        />
      ) : (
        <EmptyList text={tableLoading ? "Loading..." : ""} />
      )}
    </div>
  );
};

export default TableList;
