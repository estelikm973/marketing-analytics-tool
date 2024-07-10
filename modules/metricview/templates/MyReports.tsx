"use client";

import { Badge } from "@/components/ui/badge";
import { ReportContext } from "@/context/ReportContext";
import EmptyList from "@/modules/common/EmptyList";
import { FC, ReactNode, useContext } from "react";

const MyReports = () => {
  const { reportSettings } = useContext(ReportContext);

  return (
    <div className="bg-white rounded-md p-8">
      <h2 className="text-xl font-medium mb-4">My Reports</h2>
      <div className="grid grid-cols-4 gap-3">
        {!reportSettings.length ? (
          <div className="col-span-4">
            <EmptyList />
          </div>
        ) : (
          reportSettings.map((el) => (
            <div
              key={el.id}
              className="border rounded-md shadow-md p-4 col-span-1"
            >
              <h3 className="text-base font-medium mb-4">{el.name}</h3>

              <ul className="text-xs space-y-3">
                <li>
                  <Label>Type:</Label>
                  <span>
                    <Badge variant="secondary">{el.type}</Badge>
                  </span>
                </li>
                <li>
                  <Label>Metrics:</Label>
                  <span>
                    {el.metrics.map((el) => {
                      return (
                        <Badge variant="outline" key={el.apiName}>
                          {el.uiName}
                        </Badge>
                      );
                    })}
                  </span>
                </li>
                <li>
                  <Label>Dimensions:</Label>
                  <span>
                    {el.dimensions.map((el) => {
                      return (
                        <Badge variant="outline" key={el.apiName}>
                          {el.uiName}
                        </Badge>
                      );
                    })}
                  </span>
                </li>
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReports;

const Label: FC<{ children: ReactNode }> = ({ children }) => {
  return <span className="mr-3">{children}</span>;
};
