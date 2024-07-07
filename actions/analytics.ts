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

const dimensions2 = [
  {
    name: "pageTitle",
  },
];

const metrics2 = [
  { name: "screenPageViews" },
  { name: "screenPageViewsPerSession" },
  { name: "screenPageViewsPerUser" },
  { name: "userEngagementDuration" },
];

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

export const getTableData = async () => {
  try {
    const report = await runReport(dimensions, metrics);

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

export const getTable2Data = async () => {
  try {
    const report = await runReport(dimensions2, metrics2);
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

    report.rows?.forEach((row) => {
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
