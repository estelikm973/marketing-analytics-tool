"use client";

import { ReportContext } from "@/context/ReportContext";
import EmptyList from "@/modules/common/EmptyList";
import { useContext } from "react";
import TableListItem from "../components/TableListItem";

const TableList = () => {
  const { reportSettings } = useContext(ReportContext);

  return (
    <div className="bg-white rounded-md p-8">
      <div>
        <h2 className="sr-only">Table List</h2>
      </div>

      <div className="space-y-12">
        {!reportSettings.filter((settings) => settings.type === "table")
          .length ? (
          <EmptyList />
        ) : (
          reportSettings
            .filter((settings) => settings.type === "table")
            .map((el) => {
              return <TableListItem key={el.id} reportSettings={el} />;
            })
        )}
      </div>
    </div>
  );
};

export default TableList;
