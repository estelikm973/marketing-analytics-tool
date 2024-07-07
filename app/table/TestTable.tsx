import { getTableData } from "@/actions/analytics";
import DataTable from "@/components/DataTable";

const TestTable = async () => {
  const { headers, rows, totals } = await getTableData();

  return (
    <DataTable tableHeaders={headers} tableRows={rows} tableFooters={totals} />
  );
};

export default TestTable;
