"use client";

import { Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { FC, useEffect } from "react";
import dayjs from "dayjs";

interface IGridChartProps {
  data: any[];
  xDataKey: string;
  yDataKey: string;
  xLabel: string;
  yLabel: string;
}

const GridChart: FC<IGridChartProps> = ({
  data,
  xDataKey,
  yDataKey,
  yLabel,
}) => {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const chartConfig = {
    views: {
      label: "Page Views",
    },
    yDataKey: {
      label: yLabel,
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <LineChart
        accessibilityLayer
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis hide dataKey={xDataKey} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="views"
              labelFormatter={(value) => {
                return dayjs(value).format("MMM DD, YYYY");
              }}
            />
          }
        />
        <Line
          type="linear"
          dataKey={yDataKey}
          stroke="#000"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
};
export default GridChart;
