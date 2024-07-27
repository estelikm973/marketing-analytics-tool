import { FC, useState } from "react";
import SelectDataSource from "../SelectDataSource";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreateManualEntryForm from "./CreateManualEntryForm";
import CreateImportedEntryForm from "./CreateImportedEntryForm";

enum TabItem {
  MANUAL = "manual",
  IMPORTED = "imported",
  CUSTOM = "custom",
}

interface IAddMetricConnectionFormProps {
  metric_id: string;
  closeDialog: () => void;
}

const AddMetricConnectionForm: FC<IAddMetricConnectionFormProps> = ({
  metric_id,
  closeDialog,
}) => {
  const [dataSourceKey, setDataSourceKey] = useState("");

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
        <CreateManualEntryForm
          metric_id={metric_id}
          closeDialog={closeDialog}
        />
      </TabsContent>
      <TabsContent value={TabItem.IMPORTED}>
        <CreateImportedEntryForm
          metric_id={metric_id}
          closeDialog={closeDialog}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AddMetricConnectionForm;
