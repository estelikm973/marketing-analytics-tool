import { ReactNode } from "react";

const CustomLabel = ({ children }: { children: ReactNode }) => {
  return <div className="text-sm font-medium">{children}</div>;
};

export default CustomLabel;
