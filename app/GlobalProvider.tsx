import { ReportContextProvider } from "@/context/ReportContext";

interface IGlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<IGlobalProviderProps> = ({
  children,
}) => {
  return <ReportContextProvider>{children}</ReportContextProvider>;
};
