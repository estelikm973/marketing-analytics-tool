import TableViewTemplate from "@/modules/tableview/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table View - Marketing Analytics Tool",
};

export default async function TableView() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="my-8">
        <h1 className="text-3xl font-medium mb-8">Table View</h1>
        <TableViewTemplate />
      </main>
    </div>
  );
}
