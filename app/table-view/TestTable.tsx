import { getTableData } from "@/actions/analytics";
import DataTable from "@/components/DataTable";

const TestTable = async () => {
  const { headers, rows } = await getTableData();

  return <DataTable tableHeaders={headers} tableRows={rows} />;
};

export default TestTable;
