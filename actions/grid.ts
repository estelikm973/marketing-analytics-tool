"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";
import { DataSourceKeys } from "@/data/platforms";
import { getGAMetricSum } from "./analytics";
import dayjs from "dayjs";
import { IGridItem, IMetric } from "@/lib/types";

interface IDataSet {
  label: string;
  data: IDataItem[];
}

interface IDataItem {
  data: any[];
  xDataKey: string;
  yDataKey: string;
  xLabel: string;
  yLabel: string;
  metricTotal: number;
}

export const getGridData = async (filterDate: string) => {
  const userId = await getUserId();

  if (!userId) return [];

  const gridMetrics = await prisma.metric.findMany({
    where: { user_id: userId, show_on_grid: true },
    include: {
      connections: {
        include: { data_source_connection: true, manual_entries: true },
      },
    },
  });

  const dataSet: IGridItem[] = [];

  const previousMonthLimit = 5;

  for (let i = 0; i < gridMetrics.length; i++) {
    const metric = gridMetrics[i];

    if (!metric) continue;

    const prevMonthsData: { x: string; y: number }[] = [];
    let xLabel = "Date";
    let yLabel = metric.name;
    let xDataKey = "x";
    let yDataKey = "y";

    for (let j = 0; j <= previousMonthLimit; j++) {
      const monthDate = dayjs(filterDate).subtract(j, "month");

      const dateFrom = dayjs(monthDate).startOf("month").format("YYYY-MM-DD");
      const dateTo = dayjs(monthDate).endOf("month").format("YYYY-MM-DD");

      const total = await getMetricAggregateTotal(metric, dateFrom, dateTo);

      prevMonthsData.push({ x: monthDate.format("MMMM, YYYY"), y: total });
    }

    dataSet.push({
      label: metric.name,
      data: {
        metricTotal: isNaN(prevMonthsData[0].y) ? 0 : prevMonthsData[0].y,
        xDataKey,
        yDataKey,
        xLabel,
        yLabel,
        data: prevMonthsData.toReversed(),
      },
    });
  }

  return dataSet;
};

export const getManualTotal = async (
  metric: IMetric,
  dateFrom: string,
  dateTo: string
) => {
  let total = 0;

  if (!metric.connections) return 0;

  const manualConnections = metric.connections.filter(
    (connection) => connection.manual_entries?.length
  );

  if (!manualConnections.length) return 0;

  for (let i = 0; i < manualConnections.length; i++) {
    const connection = manualConnections[i];
    const manualEntryAggregate = await prisma.manualEntry.aggregate({
      _sum: {
        value: true,
      },
      where: {
        entry_date: {
          gte: dateFrom,
          lte: dateTo,
        },
        metric_connection_id: connection.id,
      },
    });

    if (manualEntryAggregate && manualEntryAggregate._sum.value) {
      total += Number(manualEntryAggregate._sum.value);
    }
  }

  return total;
};

export const getGoogleAnalyticsTotal = async (
  metric: IMetric,
  dateFrom: string,
  dateTo: string
) => {
  let total = 0;

  if (!metric.connections) return 0;

  const metricGAConnection = metric.connections.find(
    (el) =>
      el.data_source_connection?.data_source_key ===
      DataSourceKeys.GOOGLE_ANALYTICS
  );

  if (!metricGAConnection || !metricGAConnection.metric_key) return 0;

  const gaTotal = await getGAMetricSum({
    metricKey: metricGAConnection.metric_key,
    startDate: dateFrom,
    endDate: dateTo,
  });

  if (gaTotal) {
    total += Number(gaTotal) || 0;
  }

  return total;
};

const getMetricAggregateTotal = async (
  metric: IMetric,
  dateFrom: string,
  dateTo: string
) => {
  let total = 0;

  // manual total
  const manualTotal: number = await getManualTotal(metric, dateFrom, dateTo);
  if (manualTotal) {
    total += manualTotal;
  }

  // google analytics total
  const gaTotal: number = await getGoogleAnalyticsTotal(
    metric,
    dateFrom,
    dateTo
  );
  if (gaTotal) {
    total += gaTotal;
  }

  return total;
};
