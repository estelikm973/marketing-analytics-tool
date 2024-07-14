"use server";

import prisma from "@/lib/prisma";
import { getGAMetricSum } from "./analytics";

const userId = "fb196cd2-01ba-4b16-a15c-d1b4a1122466";

export const getTableData = async () => {
  const tableHead = ["Non-Paid Channel"];
  const tableBody: string[][] = [];
  const tableFoot = ["Total"];

  const googleAnalyticsRow = ["Google Analytics"];

  const tableMetrics = await prisma.metric.findMany({
    where: { user_id: userId, show_on_table: true },
    include: { connections: true },
  });

  for (let i = 0; i < tableMetrics.length; i++) {
    const metric = tableMetrics[i];
    let val = "N/A";

    tableHead.push(metric.name);

    const metricGAConnection = metric.connections.find(
      (connection) => connection.source_platform === "google-analytics"
    );

    if (metricGAConnection) {
      const sum = await getGAMetricSum(metricGAConnection.metric_key);

      val = sum || "N/A";
    }

    googleAnalyticsRow.push(val);
    tableFoot.push(val);
  }

  tableBody.push(googleAnalyticsRow);

  return { tableHead, tableBody, tableFoot };
};
