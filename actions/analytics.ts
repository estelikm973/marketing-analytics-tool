"use server";

import { analyticsDataClient } from "@/lib/googleClient";
import { getGoogleAnalyticsAccessData } from "./auth";

export async function runReport({
  dimensions,
  metrics,
  startDate,
  endDate,
  orderBys,
}: {
  dimensions: { name: string }[];
  metrics: { name: string }[];
  startDate: string;
  endDate: string;
  orderBys?: any;
}) {
  const accessData = await getGoogleAnalyticsAccessData();

  if (!accessData || !accessData.access_token || !accessData.property_name)
    return null;

  const { access_token, property_name } = accessData;

  const res = await analyticsDataClient(access_token).runReport({
    property: `${property_name}`,
    dateRanges: [
      {
        startDate,
        endDate,
      },
    ],
    dimensions,
    metrics,
    metricAggregations: [1],
    orderBys,
  });

  return res[0];
}

export async function getGAMetricSum({
  metricKey,
  startDate,
  endDate,
}: {
  metricKey: string;
  startDate?: string;
  endDate?: string;
}) {
  const accessData = await getGoogleAnalyticsAccessData();

  if (!accessData || !accessData.access_token || !accessData.property_name)
    return null;

  const { access_token, property_name } = accessData;

  const res = await analyticsDataClient(access_token).runReport({
    property: `${property_name}`,
    dateRanges: [
      {
        startDate,
        endDate,
      },
    ],
    dimensions: [],
    metrics: [{ name: metricKey }],
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
    const accessData = await getGoogleAnalyticsAccessData();

    if (!accessData || !accessData.access_token || !accessData.property_name)
      return null;

    const { access_token, property_name } = accessData;

    const res = await analyticsDataClient(access_token).getMetadata({
      name: `${property_name}/metadata`,
    });

    return res[0];
  } catch (err: any) {
    console.error(err || "Server Error");
    return null;
  }
};

export async function getCompatibleDimensionsAndMetrics(
  dimensionApiNames: string[],
  metricApiNames: string[]
) {
  try {
    const accessData = await getGoogleAnalyticsAccessData();

    if (!accessData || !accessData.access_token || !accessData.property_name)
      return null;

    const { access_token, property_name } = accessData;

    const res = await analyticsDataClient(access_token).checkCompatibility({
      property: `${property_name}`,
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

//TODO: Remove
export const getGAGridGraphData = async (
  metricKey: string,
  dateFrom: string,
  dateTo: string
) => {
  try {
    const report = await runReport({
      dimensions: [{ name: "date" }],
      metrics: [{ name: metricKey }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
      startDate: dateFrom,
      endDate: dateTo,
    });

    if (!report?.rowCount) {
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
