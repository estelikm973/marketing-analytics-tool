"use client";

import { createContext, useEffect, useState } from "react";
import { IReportContext, IReportContextProvider } from "./types";
import { IReportItemSettings } from "@/lib/types";

export const ReportContext = createContext<IReportContext>(
  {} as IReportContext
);

export const ReportContextProvider: React.FC<IReportContextProvider> = ({
  children,
}) => {
  const [reportSettings, setReportSettings] = useState<IReportItemSettings[]>(
    []
  );

  return (
    <ReportContext.Provider
      value={{
        reportSettings,
        setReportSettings,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
