export interface IMetric {
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
