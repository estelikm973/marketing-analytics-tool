import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatReportForTable = (reportData: any, metaData: any) => {
  const headers: string[] = [];
  const totals: string[] = [];

  if (reportData.totals && reportData.totals.length > 0) {
    reportData.totals[0].metricValues?.forEach((el: any) => {
      const val = el.value;

      if (isNaN(Number(val))) {
        totals.push(val || "N/A");
      } else {
        const numVal = parseFloat(Number(val).toFixed(2));
        totals.push(numVal.toString());
      }
    });
  }

  reportData.dimensionHeaders?.forEach((header: any) => {
    const uiName = metaData?.dimensions?.find(
      (el: any) => el.apiName === header.name
    )?.uiName;

    headers.push(uiName || header.name || "N/A");
  });

  reportData.metricHeaders?.forEach((header: any) => {
    const uiName = metaData?.metrics?.find(
      (el: any) => el.apiName === header.name
    )?.uiName;

    headers.push(uiName || header.name || "N/A");
  });

  const rows: string[][] = [];

  reportData.rows?.forEach((row: any, index: any) => {
    const rowData: string[] = [];

    row.dimensionValues?.forEach((el: any) => {
      rowData.push(el.value || "N/A");
    });

    row.metricValues?.forEach((el: any) => {
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
};
