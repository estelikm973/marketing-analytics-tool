"use server";

import prisma from "@/lib/prisma";

const userId = "fb196cd2-01ba-4b16-a15c-d1b4a1122466";

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
}) => {
  const { name, show_on_grid, show_on_table, metric_key, source_platform } =
    data;

  if (!name) return;

  const newMetric = await prisma.metric.create({
    data: { user_id: userId, name, show_on_grid, show_on_table },
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
  }
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
