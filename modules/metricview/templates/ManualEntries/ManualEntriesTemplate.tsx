"use client";

import {
  ManualTemplateBoxType,
  manualTemplateEntries,
} from "@/data/manualEntries";
import MetricItem from "../../components/MetricItem";
import EmptyList from "@/modules/common/EmptyList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateManualEntry from "./CreateManualEntry";
import { useState } from "react";

function ManualEntriesTemplate() {
  return (
    <div className="flex gap-4 flex-wrap">
      {!manualTemplateEntries.length ? (
        <div className="col-span-4">
          <EmptyList />
        </div>
      ) : (
        manualTemplateEntries.map((el) => (
          <ManualEntryTemplateItem key={el.id} entry={el} />
        ))
      )}
    </div>
  );
}

function ManualEntryTemplateItem({ entry }: { entry: ManualTemplateBoxType }) {
  const [onModalOpen, setOnModalOpen] = useState(false);

  return (
    <Dialog open={onModalOpen} onOpenChange={setOnModalOpen}>
      <DialogTrigger>
        <MetricItem entry={entry} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{entry.label}</DialogTitle>
        </DialogHeader>
        <CreateManualEntry
          entry={entry}
          closeModal={() => setOnModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ManualEntriesTemplate;
