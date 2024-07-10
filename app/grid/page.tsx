import { Metadata } from "next";
import GridViewTemplate from "@/modules/gridview/templates";

export const metadata: Metadata = {
  title: "Grid - Marketing Analytics Tool",
};

export default async function GridView() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="my-8">
        <h1 className="text-3xl font-medium mb-8">Grid View</h1>
        <GridViewTemplate />
      </main>
    </div>
  );
}
