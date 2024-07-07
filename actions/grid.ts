"use server";

import { analyticsDataClient } from "@/libs/google";
import { getMetaData } from "./analytics";

const propertyId = "448983413";

enum MetricAggregation {
  METRIC_AGGREGATION_UNSPECIFIED = 0,
  TOTAL = 1,
  MINIMUM = 5,
  MAXIMUM = 6,
  COUNT = 4,
}

const dimensions = [
  {
    name: "date",
  },
];

const metrics = [{ name: "screenPageViews" }];

export async function runReport(dimensions: any[], metrics: any[]) {
  const res = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2024-03-31",
        endDate: "2024-07-06",
      },
    ],
    dimensions,
    metrics,
    orderBys: [{ dimension: { dimensionName: "date" } }],
    metricAggregations: [MetricAggregation.TOTAL],
  });

  return res[0];
}

export const getData = async () => {
  try {
    const report = await runReport(dimensions, metrics);

    return report;
  } catch (err: any) {
    console.error(err || "Server Error");
    return { headers: [], rows: [] };
  }
};

export const getGridData = async () => {
  try {
    const report = await runReport(dimensions, metrics);

    if (report.rowCount && report.rowCount <= 0) {
      return;
    }

    const metaData = await getMetaData();

    const data: any[] = [];
    let xLabel = "";
    let yLabel = "";
    let xDataKey = "x";
    let yDataKey = "y";
    let metricTotal = 0;

    if (report.dimensionHeaders && report.dimensionHeaders.length > 0) {
      const dimentionKey = report.dimensionHeaders[0].name;

      const uiName = metaData?.dimensions?.find(
        (el) => el.apiName === dimentionKey
      )?.uiName;

      if (uiName && dimentionKey) {
        xLabel = uiName;
        xDataKey = dimentionKey;
      }
    }

    if (report.metricHeaders && report.metricHeaders.length > 0) {
      const metricKey = report.metricHeaders[0].name;
      const uiName = metaData?.metrics?.find(
        (el) => el.apiName === metricKey
      )?.uiName;

      if (uiName && metricKey) {
        yLabel = uiName;
        yDataKey = metricKey;
      }
    }

    if (report.rows)
      report.rows.forEach((row) => {
        let x: string = "";
        let y: string = "";

        if (
          row?.dimensionValues &&
          row.dimensionValues.length > 0 &&
          row.dimensionValues[0].value
        ) {
          x = row.dimensionValues[0].value;
        }

        if (
          row?.metricValues &&
          row.metricValues.length > 0 &&
          row.metricValues[0].value
        ) {
          y = row.metricValues[0].value;
          metricTotal += isNaN(Number(y)) ? 0 : Number(y);
        }

        data.push({ [xDataKey]: x, [yDataKey]: y });
      });

    return { data, xDataKey, yDataKey, xLabel, yLabel, metricTotal };
  } catch (err: any) {
    console.error(err || "Server Error");
  }
};
