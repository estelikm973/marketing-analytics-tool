"use server";

import prisma from "@/lib/prisma";
import { MetricType } from "@/lib/types";

const userId = "18ca62fb-ede7-4a2d-b687-366d1c8c15df";

export const getMyMetrics = async () => {
  const myMetrics = await prisma.metric.findMany({
    where: { user_id: userId },
    include: { connections: true },
    orderBy: { created_at: "desc" },
  });

  return myMetrics || [];
};

export const createMetric = async (data: {
  name: string;
  show_on_grid: boolean;
  show_on_table: boolean;
  source_platform?: string;
  metric_key?: string;
  metric_type: MetricType;
  content?: { [key: string]: any };
}) => {
  const {
    name,
    show_on_grid,
    show_on_table,
    metric_type,
    metric_key,
    source_platform,
    content = {},
  } = data;

  if (!name) return;

  const newMetric = await prisma.metric.create({
    data: {
      user_id: userId,
      name,
      show_on_grid,
      data: content,
      metric_type,
      show_on_table,
    },
  });

  if (source_platform && metric_key) {
    await prisma.metricConnection.create({
      data: {
        metric_id: newMetric.id,
        source_platform,
        metric_key,
      },
    });
  }

  return newMetric;
};
export const updateMetricById = async (
  id: string,
  data: {
    show_on_table?: boolean;
    show_on_grid?: boolean;
  },
) => {
  const { show_on_grid, show_on_table } = data;

  const updatedMetric = await prisma.metric.update({
    where: { id },
    data: { show_on_grid, show_on_table },
  });

  return updatedMetric;
};

export const deleteMetricById = async (id: string) => {
  const deletedMetric = await prisma.metric.delete({ where: { id } });

  return deletedMetric;
};
