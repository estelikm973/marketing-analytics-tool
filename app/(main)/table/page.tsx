import TableViewTemplate from "@/modules/tableview/templates";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table View - Marketing Analytics Tool",
};

export default async function TableView() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="m-8">
        <TableViewTemplate />
      </main>
    </div>
  );
}
