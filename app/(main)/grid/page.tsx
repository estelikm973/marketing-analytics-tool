import { Metadata } from "next";
import GridViewTemplate from "@/modules/gridview/templates";

export const metadata: Metadata = {
  title: "Grid - Marketing Analytics Tool",
};

export default async function GridView() {
  return (
    <div className="max-w-screen-xl mx-auto">
      <main className="m-8">
        <GridViewTemplate />
      </main>
    </div>
  );
}
