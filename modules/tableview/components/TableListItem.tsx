import { getTableData } from "@/actions/analytics";
import DataTable from "@/components/DataTable";
import { IReportItemSettings } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

interface ITableListItemProps {
  reportSettings: IReportItemSettings;
}

const TableListItem: React.FC<ITableListItemProps> = ({ reportSettings }) => {
  const [tableData, setTableData] = useState<{
    headers: string[];
    rows: string[][];
    totals: string[];
  }>();
  const [loading, setLoading] = useState(false);

  const fetchTableData = useCallback(async () => {
    setLoading(true);
    const data = await getTableData(
      reportSettings.dimensions,
      reportSettings.metrics
    );

    setTableData(data);
    setLoading(false);
  }, [reportSettings]);

  useEffect(() => {
    fetchTableData();
  }, [reportSettings, fetchTableData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tableData) return null;

  return (
    <div>
      <h3 className="text-gray-900 text-xl font-medium mb-2">{reportSettings.name}</h3>
      <DataTable
        tableHeaders={tableData.headers}
        tableRows={tableData.rows}
        tableFooters={tableData.totals}
      />
    </div>
  );
};

export default TableListItem;
