import { IReportItemSettings } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export interface IReportContextProvider {
  children: React.ReactNode;
}

export interface IReportContext {
  reportSettings: IReportItemSettings[];
  setReportSettings: Dispatch<SetStateAction<IReportItemSettings[]>>;
}
