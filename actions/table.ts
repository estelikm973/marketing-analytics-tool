"use server";

import prisma from "@/lib/prisma";
import { getGAMetricSum } from "./analytics";
import { getUserId } from "./auth";
import { IMetric } from "@/lib/types";
import { DataSourceKeys } from "@/data/platforms";

type TableRow = string[];

export const getTableData = async () => {
  const tableHead = ["Non-Paid Channel"];
  const tableBody: string[][] = [];
  const tableFoot = ["Total"];

  const userId = await getUserId();

  if (!userId) return;

  const manualRow: TableRow = ["Manual"];
  let isManualRowEmpty = true;

  const googleAnalyticsRow: TableRow = ["Google Analytics"];
  let isGoogleAnalyticsRowEmpty = true;

  const tableMetrics = await prisma.metric.findMany({
    where: { user_id: userId, show_on_table: true },
    include: {
      connections: {
        include: { manual_entry: true, data_source_connection: true },
      },
    },
  });

  for (let i = 0; i < tableMetrics.length; i++) {
    const metric: IMetric = tableMetrics[i];
    let total = 0;

    tableHead.push(metric.name);

    // Manual Data
    const manualData: number | undefined = getManualData(metric);
    if (manualData !== undefined) {
      isManualRowEmpty = false;
      manualRow.push(manualData.toString());
      total += manualData;
    } else {
      manualRow.push("-");
    }

    // Google Analytics Data
    const gaData: number | undefined = await getGoogleAnalyticsData(metric);
    if (gaData !== undefined) {
      isGoogleAnalyticsRowEmpty = false;
      googleAnalyticsRow.push(gaData.toString());
      total += gaData;
    } else {
      googleAnalyticsRow.push("-");
    }

    tableFoot.push(total.toString());
  }

  if (!isGoogleAnalyticsRowEmpty) {
    tableBody.push(googleAnalyticsRow);
  }

  if (!isManualRowEmpty) {
    tableBody.push(manualRow);
  }

  return { tableHead, tableBody, tableFoot };
};

const getManualData: (metric: IMetric) => number | undefined = (
  metric: IMetric
) => {
  let data = undefined;

  const manualEntry = metric.connections?.find(
    (connection) => !!connection.manual_entry
  )?.manual_entry;

  if (manualEntry && !!manualEntry?.value) {
    data = Number(manualEntry.value);
  }

  return data;
};

const getGoogleAnalyticsData: (
  metric: IMetric
) => Promise<number | undefined> = async (metric: IMetric) => {
  const metricGAConnection = metric.connections?.find(
    (el) =>
      el.data_source_connection?.data_source_key ===
      DataSourceKeys.GOOGLE_ANALYTICS
  );

  if (!metricGAConnection || !metricGAConnection.metric_key) return;

  const sum = await getGAMetricSum(metricGAConnection.metric_key);

  if (!sum || isNaN(Number(sum))) return;

  return Number(sum);
};
