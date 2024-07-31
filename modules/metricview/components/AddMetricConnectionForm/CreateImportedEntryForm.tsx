"use client";

import { FC, useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveImportedConnection } from "@/actions/metrics";
import SelectGAMetric from "../SelectGAMetric";
import SelectDataSource from "../SelectDataSource";
import { DataSourceKeys } from "@/data/platforms";
import { IMetric } from "@/lib/types";
import { MetricContext } from "@/context/MetricsContext";

interface ICreateImportedEntryFormProps {
  metric: IMetric;
}

const CreateImportedEntryForm: FC<ICreateImportedEntryFormProps> = ({
  metric,
}) => {
  const { closeDialog, fetchMyMetrics } = useContext(MetricContext);

  const [metricKey, setMetricKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSourceKey, setDataSourceKey] = useState("");
  const [gAMetricConnectionId, setGAMetricConnectionId] = useState("");
  const [defaultMetricKey, setDefaultMetricKey] = useState("");

  const handleSubmit = async () => {
    if (!metric.id || !metricKey || !dataSourceKey) return;

    setLoading(true);

    const res = await saveImportedConnection(
      metric.id,
      metricKey,
      dataSourceKey,
      gAMetricConnectionId
    );

    setLoading(false);

    if (res?.id) {
      closeDialog();
      fetchMyMetrics();
    }
  };

  useEffect(() => {
    if (dataSourceKey === DataSourceKeys.GOOGLE_ANALYTICS) {
      const googleAnalyticsConnection = metric.connections?.find(
        (connection) =>
          connection.data_source_connection?.data_source_key ===
          DataSourceKeys.GOOGLE_ANALYTICS
      );

      if (googleAnalyticsConnection) {
        setGAMetricConnectionId(googleAnalyticsConnection.id);
        setDefaultMetricKey(googleAnalyticsConnection.metric_key || "");
      }
    } else {
      setGAMetricConnectionId("");
      setDefaultMetricKey("");
    }
  }, [metric, dataSourceKey]);

  return (
    <div className="space-y-4 py-4">
      <div className="relative">
        <SelectDataSource
          dataSourceKey={dataSourceKey}
          setDataSourceKey={setDataSourceKey}
        />
      </div>
      {dataSourceKey === DataSourceKeys.GOOGLE_ANALYTICS && (
        <div className="grid gap-2">
          <SelectGAMetric
            metricKey={metricKey}
            setMetricKey={setMetricKey}
            defaultMetricKey={defaultMetricKey}
          />
        </div>
      )}
      <Button disabled={loading} type="button" onClick={handleSubmit}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>Save</>
        )}
      </Button>
    </div>
  );
};

export default CreateImportedEntryForm;
