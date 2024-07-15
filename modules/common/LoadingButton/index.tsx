"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
import LoadingIndicator from "./LoadingIndicator";
import { Button } from "@/components/ui/button";

interface ILoadingButtonProps {
  defaultText: string;
  loadingText: string;
}

const LoadingButton: FC<ILoadingButtonProps> = ({
  defaultText,
  loadingText,
}) => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" disabled={pending}>
      {pending && (
        <div className="mr-4">
          <LoadingIndicator />
        </div>
      )}
      {pending ? loadingText : defaultText}
    </Button>
  );
};
export default LoadingButton;
