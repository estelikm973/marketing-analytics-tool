import { Metadata } from "next";
import { Suspense } from "react";
import TestTable from "./TestTable";
import TestTable2 from "./TestTable2";

export const metadata: Metadata = {
  title: "Table View - Marketing Analytics Tool",
};

export default async function TableView() {
  return (
    <div className="max-w-screen-2xl mx-auto p-16">
      <main>
        <h1 className="text-3xl font-medium mb-8">Table View</h1>
        <Suspense fallback={<div>loading...</div>}>
          <TestTable2 />
          <div className="mt-16">
            <TestTable />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
