"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";
import { IMetric } from "@/lib/types";

export const getMyMetrics = async () => {
  const userId = await getUserId();

  if (!userId) return;
  const myMetrics: IMetric[] = await prisma.metric.findMany({
    where: { user_id: userId },
    include: { connections: true },
    orderBy: { created_at: "desc" },
  });

  return myMetrics || [];
};

export const createMetric = async (data: { name: string }) => {
  const { name } = data;

  const userId = await getUserId();

  if (!name || !userId) return;

  const newMetric = await prisma.metric.create({
    data: { user_id: userId, name },
  });

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

export const addManualEntry = async (
  metricId: string,
  value: number,
  format: string,
  dateFrom: Date,
  dateTo: Date
) => {
  if (!metricId || !value || !format || !dateFrom || !dateTo) return null;

  const metric = await prisma.metric.findUnique({ where: { id: metricId } });

  if (!metric) return null;

  const newMetricConnection = await prisma.metricConnection.create({
    data: { metric_id: metric.id },
  });

  const newManualEntry = await prisma.manualEntry.create({
    data: {
      metric_connection_id: newMetricConnection.id,
      value,
      format,
      date_from: dateFrom,
      date_to: dateTo,
    },
  });

  return newManualEntry;
};

export const addImportedConnection = async (
  metricId: string,
  metricKey: string,
  dataSourceKey: string
) => {
  if (!metricId || !metricKey || !dataSourceKey) return null;

  const userId = await getUserId();

  if (!userId) return null;

  const metric = await prisma.metric.findUnique({ where: { id: metricId } });

  if (!metric) return null;

  const dataSourceConnection = await prisma.dataSourceConnection.findFirst({
    where: { user_id: userId, data_source_key: dataSourceKey },
  });

  if (!dataSourceConnection) return null;

  const newMetricConnection = await prisma.metricConnection.create({
    data: {
      metric_id: metric.id,
      data_source_connection_id: dataSourceConnection.id,
      metric_key: metricKey,
    },
  });

  return newMetricConnection;
};
