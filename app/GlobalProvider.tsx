import { DataSourceContextProvider } from "@/context/DataSourceContext";
import { MetricContextProvider } from "@/context/MetricsContext";
import { ReportContextProvider } from "@/context/ReportContext";

interface IGlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<IGlobalProviderProps> = ({
  children,
}) => {
  return (
    <DataSourceContextProvider>
      <ReportContextProvider>
        <MetricContextProvider>{children}</MetricContextProvider>
      </ReportContextProvider>
    </DataSourceContextProvider>
  );
};
