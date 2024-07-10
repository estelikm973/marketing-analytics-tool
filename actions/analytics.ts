"use server";

import { analyticsDataClient } from "@/lib/google";
import { IDimension, IMetric } from "@/lib/types";

const propertyId = "448983413";

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
    metricAggregations: [1],
  });

  return res[0];
}

export const getMetaData = async () => {
  try {
    const res = await analyticsDataClient.getMetadata({
      name: `properties/${propertyId}/metadata`,
    });

    return res[0];
  } catch (err: any) {
    console.error(err || "Server Error");
    return null;
  }
};

export const getTableData = async (
  dimensions: IDimension[],
  metrics: IMetric[]
) => {
  try {
    const report = await runReport(
      dimensions.map((el) => ({ name: el.apiName })),
      metrics.map((el) => ({ name: el.apiName }))
    );

    const metaData = await getMetaData();

    const headers: string[] = [];
    const totals: string[] = [];

    if (report.totals && report.totals.length > 0) {
      report.totals[0].metricValues?.forEach((el) => {
        const val = el.value;

        if (isNaN(Number(val))) {
          totals.push(val || "N/A");
        } else {
          const numVal = parseFloat(Number(val).toFixed(2));
          totals.push(numVal.toString());
        }
      });
    }

    report.dimensionHeaders?.forEach((header) => {
      const uiName = metaData?.dimensions?.find(
        (el) => el.apiName === header.name
      )?.uiName;

      headers.push(uiName || header.name || "N/A");
    });

    report.metricHeaders?.forEach((header) => {
      const uiName = metaData?.metrics?.find(
        (el) => el.apiName === header.name
      )?.uiName;

      headers.push(uiName || header.name || "N/A");
    });

    const rows: string[][] = [];

    report.rows?.forEach((row, index) => {
      const rowData: string[] = [];

      row.dimensionValues?.forEach((el) => {
        rowData.push(el.value || "N/A");
      });

      row.metricValues?.forEach((el) => {
        const val = el.value;

        if (isNaN(Number(val))) {
          rowData.push(val || "N/A");
        } else {
          const numVal = parseFloat(Number(val).toFixed(2));
          rowData.push(numVal.toString());
        }
      });

      rows.push(rowData);
    });

    return { headers, rows, totals };
  } catch (err: any) {
    console.error(err || "Server Error");
    return { headers: [], rows: [], totals: [] };
  }
};

export async function getCompatibleDimensionsAndMetrics(
  dimensionApiNames: string[],
  metricApiNames: string[]
) {
  try {
    const res = await analyticsDataClient.checkCompatibility({
      property: `properties/${propertyId}`,
      dimensions: dimensionApiNames.map((el) => ({ name: el })),
      metrics: metricApiNames.map((el) => ({ name: el })),
      compatibilityFilter: 1,
    });

    return res;
  } catch (err: any) {
    console.error(err || "Server Error");
    return;
  }
}

export const getGridData = async (
  dimensions: IDimension[],
  metrics: IMetric[]
) => {
  try {
    const report = await runReport(
      dimensions.map((el) => ({ name: el.apiName })),
      metrics.map((el) => ({ name: el.apiName }))
    );

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
    return;
  }
};
