"use client";

import { FC } from "react";
import ConnectGoogleAnalyticsButton from "./ConnectGoogleAnalyticsButton";
import DisconnectGoogleAnalyticsButton from "./DisconnectGoogleAnalyticsButton";
import PropertyForm from "./PropertyForm";

interface IGAConenctFormProps {
  isConnected: boolean;
}

const GAConenctForm: FC<IGAConenctFormProps> = ({ isConnected }) => {
  return (
    <div>
      <div className="text-sm mb-4">
        <span className="font-semibold">Status:</span>&nbsp;
        {isConnected ? "Connected" : "Not Connected"}
      </div>

      {isConnected ? (
        <div className="space-y-5">
          <PropertyForm />
          <hr className="divide-x" />
          <DisconnectGoogleAnalyticsButton />
        </div>
      ) : (
        <ConnectGoogleAnalyticsButton />
      )}
    </div>
  );
};
export default GAConenctForm;
