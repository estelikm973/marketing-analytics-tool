"use client";

import { FC, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addImportedConnection } from "@/actions/metrics";
import SelectGAMetric from "../SelectGAMetric";
import SelectDataSource from "../SelectDataSource";
import { DataSourceKeys } from "@/data/platforms";
import { IMetric } from "@/lib/types";

interface ICreateImportedEntryFormProps {
  metric: IMetric;
  closeDialog: () => void;
}

const CreateImportedEntryForm: FC<ICreateImportedEntryFormProps> = ({
  metric,
  closeDialog,
}) => {
  const [metricKey, setMetricKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSourceKey, setDataSourceKey] = useState("");

  const handleSubmit = async () => {
    if (!metric.id || !metricKey || !dataSourceKey) return;

    setLoading(true);

    const res = await addImportedConnection(
      metric.id,
      metricKey,
      dataSourceKey
    );

    setLoading(false);

    if (res?.id) {
      closeDialog();
    }
  };

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
          <SelectGAMetric metricKey={metricKey} setMetricKey={setMetricKey} />
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
