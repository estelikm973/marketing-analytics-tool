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

  connections?: IMetricConnection[];
  user?: any;
  user_id: string;

  name: string;
  format: string;
  show_on_grid: boolean;
  show_on_table: boolean;
}

interface IMetricConnection {
  id: string;
  created_at: Date;
  updated_at: Date;

  metric?: IMetric;
  metric_id: string;

  manual_entries?: IManualEntry[];
  manual_data_source?: IManualDataSource;
  manual_data_source_id?: string | null;

  data_source_connection?: IDataSourceConnection | null;
  data_source_connection_id: string | null;
  metric_key: string | null;
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

export interface IDataSource {
  id: string;
  created_at: Date;
  updated_at: Date;
  connections?: IDataSourceConnection[];
  name: string;
  key: string;
  hidden: Boolean;
}

export interface IDataSourceConnection {
  id: string;
  created_at: Date;
  updated_at: Date;
  metric_connections?: IMetricConnection[];

  user?: any;
  user_id: string;
  data_source?: any;
  data_source_key: string;

  account_name: string;
  property_name: string;
  access_token: string | null;
  expiry_date: bigint | null;
  id_token: string | null;
  refresh_token: string | null;
  scope: string | null;
  token_type: string | null;
}

export interface IManualEntry {
  id: string;
  created_at: Date;
  updated_at: Date;

  metric_connection?: IMetricConnection | null;
  metric_connection_id: string;

  value: bigint;
  entry_date: string;
}

export interface IManualDataSource {
  id: string;
  created_at: Date;
  updated_at: Date;

  entries?: IManualEntry[];
  metric_connections?: IMetricConnection[];

  user?: any;
  user_id: string;

  key: string; // marketing-agency / graphic-design etc.
  name: string;
}
