"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";
import { IMetric } from "@/lib/types";
import { getGoogleAnalyticsTotal, getManualTotal } from "./grid";
import dayjs from "dayjs";

type TableRow = string[];

export const getTableData = async (filterDate: string) => {
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
        include: { manual_entries: true, data_source_connection: true },
      },
    },
  });

  const dateFrom = dayjs(filterDate).startOf("month").format("YYYY-MM-DD");
  const dateTo = dayjs(filterDate).endOf("month").format("YYYY-MM-DD");

  for (let i = 0; i < tableMetrics.length; i++) {
    const metric: IMetric = tableMetrics[i];
    let total = 0;

    tableHead.push(metric.name);

    // Manual Data
    const manualData: number = await getManualTotal(metric, dateFrom, dateTo);
    if (manualData !== undefined) {
      isManualRowEmpty = false;
      manualRow.push(manualData.toString());
      total += manualData;
    } else {
      manualRow.push("-");
    }

    // Google Analytics Data
    const gaData: number | undefined = await getGoogleAnalyticsTotal(
      metric,
      dateFrom,
      dateTo
    );
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
