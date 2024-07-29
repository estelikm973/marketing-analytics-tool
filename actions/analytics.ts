"use server";

import { analyticsDataClient } from "@/lib/googleClient";
import { getGoogleAnalyticsAccessToken } from "./auth";

const propertyId = "448983413";

export async function runReport(
  dimensions: any[],
  metrics: any[],
  orderBys?: any
) {
  const access_token = await getGoogleAnalyticsAccessToken();

  if (!access_token) return null;

  const res = await analyticsDataClient(access_token).runReport({
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
  const access_token = await getGoogleAnalyticsAccessToken();

  if (!access_token) return null;

  const res = await analyticsDataClient(access_token).runReport({
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
    const access_token = await getGoogleAnalyticsAccessToken();

    if (!access_token) return null;

    const res = await analyticsDataClient(access_token).getMetadata({
      name: `properties/${propertyId}/metadata`,
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
    const access_token = await getGoogleAnalyticsAccessToken();

    if (!access_token) return null;

    const res = await analyticsDataClient(access_token).checkCompatibility({
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
