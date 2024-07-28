"use client";

import { FC } from "react";
import ConnectGoogleAnalyticsButton from "./ConnectGoogleAnalyticsButton";
import DisconnectGoogleAnalyticsButton from "./DisconnectGoogleAnalyticsButton";

interface IGAConenctFormProps {
  isConnected: boolean;
}

const GAConenctForm: FC<IGAConenctFormProps> = ({ isConnected }) => {
  return (
    <div>
      <div className="text-sm mb-2">
        <span className="font-semibold">Status:</span>&nbsp;
        {isConnected ? "Connected" : "Not Connected"}
      </div>
      {isConnected ? (
        <DisconnectGoogleAnalyticsButton />
      ) : (
        <ConnectGoogleAnalyticsButton />
      )}
    </div>
  );
};
export default GAConenctForm;
