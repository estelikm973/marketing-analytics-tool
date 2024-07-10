"use client";

import { ReportContext } from "@/context/ReportContext";
import EmptyList from "@/modules/common/EmptyList";
import { useContext } from "react";
import GridListItem from "../components/GridListItem";

const GridList = () => {
  const { reportSettings } = useContext(ReportContext);

  return (
    <div className="bg-white rounded-md p-8">
      <div>
        <h2 className="sr-only">Grid List</h2>
      </div>

      <div className="flex gap-6">
        {!reportSettings.filter((settings) => settings.type === "grid")
          .length ? (
          <EmptyList />
        ) : (
          reportSettings
            .filter((settings) => settings.type === "grid")
            .map((el) => {
              return <GridListItem key={el.id} reportSettings={el} />;
            })
        )}
      </div>
    </div>
  );
};

export default GridList;
