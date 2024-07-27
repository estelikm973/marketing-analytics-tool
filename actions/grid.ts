"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";

export const getGridData = async () => {
  const userId = await getUserId();

  if (!userId) return [];

  // const gridMetrics = await prisma.metric.findMany({
  //   where: { user_id: userId, show_on_grid: true },
  //   include: { connections: true },
  // });

  const dataSet: {
    label: string;
    data: {
      data: any[];
      xDataKey: string;
      yDataKey: string;
      xLabel: string;
      yLabel: string;
      metricTotal: number;
    };
  }[] = [];

  // for (let i = 0; i < gridMetrics.length; i++) {
  //   const metric = gridMetrics[i];

  //   const metricGAConnection = metric.connections.find(
  //     (connection) => connection.source_platform === "google-analytics"
  //   );

  //   if (metricGAConnection) {
  //     const data = await getGridGraphData(
  //       [{ apiName: "date", uiName: "Date" }],
  //       [{ apiName: metricGAConnection.metric_key, uiName: "" }]
  //     );
  //     if (data) {
  //       dataSet.push({ label: metric.name, data });
  //     }
  //   }
  // }

  return dataSet;
};
