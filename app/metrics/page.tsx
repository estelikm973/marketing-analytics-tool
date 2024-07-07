import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metrics - Marketing Analytics Tool",
};

export default async function MetricsView() {
  return (
    <div className="max-w-screen-2xl mx-auto p-16">
      <main>
        <h1 className="text-3xl font-medium mb-8">Metrics View</h1>
      </main>
    </div>
  );
}
