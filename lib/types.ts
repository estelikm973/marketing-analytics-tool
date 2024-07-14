export interface IGAMetric {
  apiName: string | null | undefined;
  uiName: string | null | undefined;
}

export interface IDimension {
  apiName: string | null | undefined;
  uiName: string | null | undefined;
}

export interface IReportItemSettings {
  id: string;
  name: string;
  metrics: IMetric[];
  dimensions: IDimension[];
  type: "grid" | "table";
}

export interface IMetric {
  id: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  name: string;
  show_on_grid: boolean;
  show_on_table: boolean;
  connections: IMetricConnection[];
}

interface IMetricConnection {
  id: string;
  created_at: Date;
  updated_at: Date;
  metric_id: string;
  source_platform: string;
  metric_key: string;
}

export interface IGridItem {
  label: string;
  data: {
    data: any[];
    xDataKey: string;
    yDataKey: string;
    xLabel: string;
    yLabel: string;
    metricTotal: number;
  };
}
