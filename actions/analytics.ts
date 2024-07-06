"use server";

import { analyticsDataClient } from "@/libs/google";

const propertyId = "448983413";

const dimensions = [
  {
    name: "campaignName",
  },
];

const metrics = [
  {
    name: "advertiserAdCost",
  },
  {
    name: "advertiserAdClicks",
  },
  {
    name: "advertiserAdImpressions",
  },
  {
    name: "itemPromotionClickThroughRate",
  },
  {
    name: "totalRevenue",
  },
  {
    name: "returnOnAdSpend",
  },
];

async function runReport() {
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

export const getTableData = async () => {
  try {
    const report = await runReport();

    const metaData = await getMetaData();

    const headers: string[] = [];

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
      console.log({ uiName, header });
      headers.push(uiName || header.name || "N/A");
    });

    const rows: string[][] = [];

    report.rows?.forEach((row) => {
      const rowData: string[] = [];

      row.dimensionValues?.forEach((el) => {
        rowData.push(el.value || "N/A");
      });

      row.metricValues?.forEach((el) => {
        rowData.push(el.value || "N/A");
      });

      rows.push(rowData);
    });

    return { headers, rows };
  } catch (err: any) {
    console.error(err || "Server Error");
    return { headers: [], rows: [] };
  }
};
