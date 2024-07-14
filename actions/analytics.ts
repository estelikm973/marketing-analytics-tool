"use server";

import { analyticsDataClient } from "@/lib/google";
import { IDimension, IGAMetric } from "@/lib/types";

const propertyId = "448983413";

export async function runReport(
  dimensions: any[],
  metrics: any[],
  orderBys?: any
) {
  const res = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2020-01-01",
        endDate: "today",
      },
    ],
    dimensions,
    metrics,
    metricAggregations: [1],
    orderBys,
  });

  return res[0];
}

export async function getGAMetricSum(
  metric: string,
  startDate?: string,
  endDate?: string
) {
  const res = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2020-01-01",
        endDate: "today",
      },
    ],
    dimensions: [],
    metrics: [{ name: metric }],
    metricAggregations: [1],
  });

  if (res[0].totals?.length) {
    const values = res[0].totals[0].metricValues;
    return values && values.length ? values[0].value : "0";
  }

  return null;
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
  metrics: IGAMetric[]
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

export const getGridGraphData = async (
  dimensions: IDimension[],
  metrics: IGAMetric[]
) => {
  try {
    const report = await runReport(
      dimensions.map((el) => ({ name: el.apiName })),
      metrics.map((el) => ({ name: el.apiName })),
      [{ dimension: { dimensionName: "date" } }]
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
          metricTotal += isNaN(Number(y)) ? 0 : getFloatValue(y);
        }

        data.push({ [xDataKey]: x, [yDataKey]: getFloatValue(y) });
      });

    return { data, xDataKey, yDataKey, xLabel, yLabel, metricTotal };
  } catch (err: any) {
    console.error(err || "Server Error");
    return;
  }
};

const getFloatValue = (s: string) => {
  return parseFloat(Number(s).toFixed(2));
};
