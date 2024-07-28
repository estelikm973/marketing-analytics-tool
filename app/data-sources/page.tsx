import { Metadata } from "next";
import DataSourcesTemplate from "@/modules/dataSources/templates";

export const metadata: Metadata = {
  title: "Data Sources - Marketing Analytics Tool",
};

export default function DataSources() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="m-8">
        <h1 className="text-3xl font-medium mb-8">Data Sources</h1>
        <DataSourcesTemplate />
      </main>
    </div>
  );
}
