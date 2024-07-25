import { ManualEntryType } from "@/modules/metricview/templates/ManualEntries/types";

export const metricViewTabOptions = [
  "Manual Data Entries",
  "Imported Metrics",
  "Custom Metrics",
];

export const manualEntries: ManualEntryType[] = [
  {
    label: "Expense",
    id: "dfkdjfd",
    platform: "Google Ads",
    date: "2024-07-21",
    cost: 150.0,
    clicks: 1200,
    impressions: 50000,
    ctr: 2.4,
    conversions: 30,
    cost_per_conversion: 5.0,
    conversion_rate: 2.5,
    revenue: 300.0,
    roas: 2.0,
  },
  {
    label: "Sales",
    id: "121212121212121212121212dfkdjfd",
    platform: "Google Ads",
    date: "2024-07-21",
    cost: 150.0,
    clicks: 1200,
    impressions: 50000,
    ctr: 2.4,
    conversions: 30,
    cost_per_conversion: 5.0,
    conversion_rate: 2.5,
    revenue: 300.0,
    roas: 2.0,
  },
  {
    id: "909dfkdjfd",
    label: "Revenue",
    platform: "Google Ads",
    date: "2024-07-21",
    cost: 150.0,
    clicks: 1200,
    impressions: 50000,
    ctr: 2.4,
    conversions: 30,
    cost_per_conversion: 5.0,
    conversion_rate: 2.5,
    revenue: 300.0,
    roas: 2.0,
  },
  {
    label: "Leads",
    platform: "Google Ads",
    date: "2024-07-21",
    cost: 150.0,
    clicks: 1200,
    impressions: 50000,
    ctr: 2.4,
    conversions: 30,
    cost_per_conversion: 5.0,
    conversion_rate: 2.5,
    revenue: 300.0,
    roas: 2.0,
  },
];

export type ManualTemplateBoxType = {
  label: string;
  id: string;
  key: string;
};

export const manualTemplateEntries: ManualTemplateBoxType[] = [
  {
    id: "Expenses1",
    label: "Expenses",
    key: "expense",
  },
  {
    id: "Leads123",
    label: "Leads",
    key: "leads",
  },
  {
    id: "Sales903",
    label: "Sales",
    key: "sales",
  },
  {
    id: "Revenue8383",
    label: "Revenue",
    key: "revenue",
  },
  {
    id: "LifetimeValue903j",
    label: "Lifetime Value",
    key: "lifetime",
  },
];
