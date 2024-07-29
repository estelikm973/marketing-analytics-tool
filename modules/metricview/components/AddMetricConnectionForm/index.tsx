import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateManualEntryForm from "./CreateManualEntryForm";
import CreateImportedEntryForm from "./CreateImportedEntryForm";
import { IMetric } from "@/lib/types";

enum TabItem {
  MANUAL = "manual",
  IMPORTED = "imported",
  CUSTOM = "custom",
}

interface IAddMetricConnectionFormProps {
  metric: IMetric;
  closeDialog: () => void;
}

const AddMetricConnectionForm: FC<IAddMetricConnectionFormProps> = ({
  metric,
  closeDialog,
}) => {
  return (
    <Tabs defaultValue={TabItem.MANUAL} className="w-full relative">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value={TabItem.MANUAL}>Manual</TabsTrigger>
        <TabsTrigger value={TabItem.IMPORTED}>Imported</TabsTrigger>
        <TabsTrigger disabled value={TabItem.CUSTOM}>
          Custom
        </TabsTrigger>
      </TabsList>
      <TabsContent value={TabItem.MANUAL}>
        <CreateManualEntryForm metric={metric} closeDialog={closeDialog} />
      </TabsContent>
      <TabsContent value={TabItem.IMPORTED}>
        <CreateImportedEntryForm metric={metric} closeDialog={closeDialog} />
      </TabsContent>
    </Tabs>
  );
};

export default AddMetricConnectionForm;
