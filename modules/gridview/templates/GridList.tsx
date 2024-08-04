"use client";

import EmptyList from "@/modules/common/EmptyList";
import { useContext } from "react";
import GridListItem from "../components/GridListItem";
import { MetricContext } from "@/context/MetricsContext";

const GridList = () => {
  const { gridLoading, gridData } = useContext(MetricContext);

  return (
    <div className="bg-white rounded-md p-8 w-full">
      <div className="flex gap-6">
        {gridLoading ? (
          <EmptyList text="Loading..." />
        ) : gridData.length ? (
          gridData.map((el, index) => {
            return <GridListItem key={index} gridData={el} />;
          })
        ) : (
          <EmptyList />
        )}
      </div>
    </div>
  );
};

export default GridList;
