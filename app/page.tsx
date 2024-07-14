import { getGAMetricSum } from "@/actions/analytics";
import { getGridData } from "@/actions/grid";
import { getTableData } from "@/actions/table";

export default async function Home() {
  const data = await getGridData();

  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="my-8">
        <h1 className="text-3xl font-medium mb-8">Home</h1>
        <div>{JSON.stringify(data, null, 4)}</div>
      </main>
    </div>
  );
}
