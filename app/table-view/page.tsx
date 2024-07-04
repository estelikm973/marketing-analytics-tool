import { EventButton } from "@/components/Analytics/EventButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Table View - Marketing Analytics Tool",
};

export default function TableView() {
  return (
    <div className="max-w-screen-2xl mx-auto py-16">
      <main>
        <h1 className="text-3xl font-medium">Table View</h1>
        <EventButton />
      </main>
    </div>
  );
}
