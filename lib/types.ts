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
  show_on_grid: boolean;
  show_on_table: boolean;
}

interface IMetricConnection {
  id: string;
  created_at: Date;
  updated_at: Date;

  metric?: IMetric | null;
  metric_id: string;

  manual_entry?: any;

  data_source_connection?: any;
  data_source_connection_id?: String | null;
  metric_key?: String | null;
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
  metric_connections?: any[];
  user?: any;
  user_id: string;
  data_source: IDataSource;
  data_source_key: string;

  access_token: string | null;
  expiry_date: bigint | null;
  id_token: string | null;
  refresh_token: string | null;
  scope: string | null;
  token_type: string | null;
}
