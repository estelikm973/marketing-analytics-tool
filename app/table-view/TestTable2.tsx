import { getTable2Data } from "@/actions/analytics";
import DataTable from "@/components/DataTable";

const TestTable2 = async () => {
  const { headers, rows } = await getTable2Data();

  return <DataTable tableHeaders={headers} tableRows={rows} />;
};

export default TestTable2;
