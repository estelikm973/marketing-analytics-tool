import { Metadata } from "next";
import { getGridData } from "@/actions/grid";
import GridCharts from "./GridCharts";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Grid - Marketing Analytics Tool",
};

export default async function GridView() {
  const gridData = await getGridData();

  if (!gridData) {
    return null;
  }

  return (
    <div className="max-w-screen-2xl mx-auto p-16">
      <main>
        <h1 className="text-3xl font-medium mb-8">Grid View</h1>
        <Suspense fallback={<div>loading...</div>}>
          <GridCharts />
        </Suspense>
      </main>
    </div>
  );
}
