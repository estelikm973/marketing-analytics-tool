"use client";

import { FC, useContext, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveManualEntry } from "@/actions/metrics";
import { IMetric } from "@/lib/types";
import { MetricContext } from "@/context/MetricsContext";
import MonthPicker from "@/modules/common/MonthPicker";
import CustomLabel from "@/modules/common/Label";
import ManualDataSourceSelect from "../ManualDataSourceSelect";

interface ICreateManualEntryFormProps {
  metric: IMetric;
}

const CreateManualEntryForm: FC<ICreateManualEntryFormProps> = ({ metric }) => {
  const { closeDialog, fetchMyMetrics } = useContext(MetricContext);

  const [date, setDate] = useState<Date>();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const [manualDataSourceId, setManualDataSourceId] = useState("");

  const handleSubmit = async () => {
    if (!metric.id || !manualDataSourceId || !value || !date) return;

    setLoading(true);

    const res = await saveManualEntry(
      metric.id,
      manualDataSourceId,
      value,
      date
    );

    setLoading(false);

    if (res?.id) {
      closeDialog();
      fetchMyMetrics();
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-2">
        <CustomLabel>Manual Data Source</CustomLabel>
        <ManualDataSourceSelect
          manualDataSourceId={manualDataSourceId}
          setManualDataSourceId={setManualDataSourceId}
        />
      </div>
      <div className="grid gap-2">
        <CustomLabel>Entry for</CustomLabel>
        <MonthPicker currentMonth={date} onMonthChange={setDate} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          placeholder="Enter a number"
          required
          value={value}
          onChange={(event) => setValue(Number(event.currentTarget.value))}
        />
      </div>
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

export default CreateManualEntryForm;
