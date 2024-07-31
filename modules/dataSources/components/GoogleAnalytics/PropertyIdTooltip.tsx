import { Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PropertyIdTooltip = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Info className="size-4 hover:cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="max-w-md w-full">
        <div className="text-sm p-1 space-y-2">
          <p>To determine a Google Analytics 4 property Id:</p>
          <ol className="list-decimal list-inside pl-2">
            <li>Visit Google Analytics at https://analytics.google.com/.</li>
            <li>Select Admin.</li>
            <li>Select the Property.</li>
            <li>Select Property Settings.</li>
          </ol>
          <p>
            {`If the Property Settings shows a numeric "PROPERTY ID" such as
                "123...", this is the numeric Id of your Google Analytics 4
                property.`}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PropertyIdTooltip;
