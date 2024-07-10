"use client";

import { FC, ReactNode, useContext, useEffect, useState } from "react";
import ReportTypeSelect from "../components/ReportTypeSelect";
import { DimensionSelect } from "../components/DimensionSelect";
import { getCompatibleDimensionsAndMetrics } from "@/actions/analytics";
import { IDimension, IMetric, IReportItemSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MetricSelect } from "../components/MetricSelect";
import { ReportContext } from "@/context/ReportContext";
import { nanoid } from "nanoid";
import { Input } from "@/components/ui/input";

const CreateReport = () => {
  const { setReportSettings } = useContext(ReportContext);

  const [dimensions, setDimensions] = useState<IDimension[]>([]);
  const [metrics, setMetrics] = useState<IMetric[]>([]);

  const [selectedDimensions, setSelectedDimensions] = useState<IDimension[]>(
    []
  );
  const [selectedMetrics, setSelectedMetrics] = useState<IMetric[]>([]);

  const [tempDimensionValue, setTempDimensionValue] = useState<IDimension>(
    {} as IDimension
  );
  const [tempMetricValue, setTempMetricValue] = useState<IMetric>(
    {} as IMetric
  );

  const [reportName, setReportName] = useState<string>("");
  const [reportType, setReportType] = useState("");

  const [loading, setLoading] = useState(false);

  const updateDimensionsAndMetrics = async (
    dimensions: IDimension[],
    metrics: IMetric[]
  ) => {
    setLoading(true);
    const res = await getCompatibleDimensionsAndMetrics(
      dimensions.map((el) => el.apiName || ""),
      metrics.map((el) => el.apiName || "")
    );

    const compatibleDimensions = res?.[0].dimensionCompatibilities?.map(
      (el) => ({
        apiName: el.dimensionMetadata?.apiName,
        uiName: el.dimensionMetadata?.uiName,
      })
    );

    if (compatibleDimensions) {
      setDimensions(compatibleDimensions);
    }

    const compatibleMetrics = res?.[0].metricCompatibilities?.map((el) => ({
      apiName: el.metricMetadata?.apiName,
      uiName: el.metricMetadata?.uiName,
    }));

    if (compatibleMetrics) {
      setMetrics(compatibleMetrics);
    }

    setLoading(false);
  };

  const handleDimensionSelect = () => {
    setSelectedDimensions([tempDimensionValue]);
  };

  const handleMetricAdd = () => {
    const metricExists: boolean = selectedMetrics.some(
      (metric) => metric.apiName === tempMetricValue.apiName
    );

    if (metricExists) return;

    if (reportType === "grid") {
      setSelectedMetrics([tempMetricValue]);
    } else {
      setSelectedMetrics([...selectedMetrics, tempMetricValue]);
    }
  };

  const handleTypeChange = (type: string) => {
    setReportType(type);

    setSelectedMetrics([]);
  };

  const handleCreate = () => {
    if (
      !reportName ||
      !selectedMetrics.length ||
      !selectedDimensions.length ||
      !reportType ||
      (reportType !== "grid" && reportType !== "table")
    )
      return;

    const randomId = nanoid();

    const newReport: IReportItemSettings = {
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      type: reportType,
      id: randomId,
      name: reportName,
    };

    setReportSettings((prev) => [...prev, newReport]);
  };

  useEffect(() => {
    updateDimensionsAndMetrics(selectedDimensions, selectedMetrics);
  }, [selectedDimensions, selectedMetrics]);

  return (
    <div className="bg-white rounded-md p-8">
      <div>
        <h2 className="text-xl font-medium mb-4">Create Report</h2>
        <div className="space-y-6">
          <div>
            <Label>Report Name</Label>
            <Input
              className="w-80"
              value={reportName}
              onChange={(e) => setReportName(e.currentTarget.value)}
              type="text"
              placeholder="Page Views..."
            />
          </div>

          <div>
            <Label>Report Type</Label>
            <ReportTypeSelect
              value={reportType}
              onValueChange={handleTypeChange}
            />
          </div>

          <div>
            <Label>Dimension</Label>
            <div>
              <DimensionSelect
                dimensions={dimensions}
                loading={loading}
                tempValue={tempDimensionValue}
                setTempValue={setTempDimensionValue}
              />
              <Button className="ml-4 px-8" onClick={handleDimensionSelect}>
                Select
              </Button>
            </div>
            <div className="mt-3">
              {selectedDimensions.map((el) => {
                return (
                  <Badge variant="outline" key={el.apiName}>
                    {el.uiName}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Metrics</Label>
            <div>
              <MetricSelect
                metrics={metrics}
                loading={loading}
                tempValue={tempMetricValue}
                setTempValue={setTempMetricValue}
                selectedMetrics={selectedMetrics}
              />
              <Button className="ml-4 px-8" onClick={handleMetricAdd}>
                Add
              </Button>
            </div>
            <div className="mt-3 flex gap-2 items-center">
              {selectedMetrics.map((el) => {
                return (
                  <Badge variant="outline" key={el.apiName}>
                    {el.uiName}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div>
            <Button className="px-8" onClick={handleCreate}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateReport;

const Label: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="text-xs mb-2 text-gray-500">{children}</div>;
};
