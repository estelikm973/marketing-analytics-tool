import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CreateReportDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{`Create Report`}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Report</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            Add Dimension <Button>Add</Button>
          </div>
          <div>Add Metrics</div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default CreateReportDialog;
