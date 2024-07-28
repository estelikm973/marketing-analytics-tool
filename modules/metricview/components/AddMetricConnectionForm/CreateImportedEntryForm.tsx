"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { addImportedConnection } from "@/actions/metrics";
import SelectGAMetric from "../SelectGAMetric";
import SelectDataSource from "../SelectDataSource";

interface ICreateImportedEntryFormProps {
  metric_id: string;
  closeDialog: () => void;
}

const CreateImportedEntryForm: FC<ICreateImportedEntryFormProps> = ({
  metric_id,
  closeDialog,
}) => {
  const [metricKey, setMetricKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataSourceKey, setDataSourceKey] = useState("");

  const handleSubmit = async () => {
    if (!metric_id || !metricKey || !dataSourceKey) return;

    setLoading(true);

    const res = await addImportedConnection(
      metric_id,
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
      {dataSourceKey === "google-analytics" && (
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
