"use server";

import { analyticsDataClient } from "@/libs/google";

async function runReport() {
  const propertyId = "448983413";

  const res = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "2024-03-31",
        endDate: "2024-07-06",
      },
    ],
    dimensions: [
      {
        name: "pageTitle",
      },
      // {
      //   name: "date",
      // },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
      // {
      //   name: "totalUsers",
      // },
    ],
  });

  return res[0];
}
export const getTableData = async () => {
  try {
    const report = await runReport();

    const headers: string[] = [];

    report.dimensionHeaders?.forEach((header) => {
      headers.push(header.name || "N/A");
    });

    report.metricHeaders?.forEach((header) => {
      headers.push(header.name || "N/A");
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
