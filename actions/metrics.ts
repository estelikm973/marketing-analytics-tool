"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";
import { IMetric } from "@/lib/types";
import dayjs from "dayjs";

export const getMyMetrics = async () => {
  const userId = await getUserId();

  if (!userId) return;
  const myMetrics: IMetric[] = await prisma.metric.findMany({
    where: { user_id: userId },
    include: {
      connections: {
        include: { manual_entries: true, data_source_connection: true },
      },
    },
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

export const saveManualEntry = async (
  metricId: string,
  manualDataSourceId: string,
  value: number,
  entry_date: Date
) => {
  const userId = await getUserId();

  if (!userId || !metricId || !value || !entry_date) return null;

  const metric = await prisma.metric.findUnique({ where: { id: metricId } });

  if (!metric) return null;

  let metricConnectionId = "";
  const metricConnection = await prisma.metricConnection.findFirst({
    where: { metric_id: metric.id, manual_data_source_id: manualDataSourceId },
  });

  if (!metricConnection) {
    const newMetricConnection = await prisma.metricConnection.create({
      data: { metric_id: metric.id, manual_data_source_id: manualDataSourceId },
    });

    metricConnectionId = newMetricConnection.id;
  } else {
    metricConnectionId = metricConnection.id;
  }

  const newManualEntry = await prisma.manualEntry.create({
    data: {
      metric_connection_id: metricConnectionId,
      manual_data_source_id: manualDataSourceId,
      value,
      entry_date: dayjs(entry_date).format("YYYY-MM-DD"),
    },
  });

  return newManualEntry;
};

export const saveImportedConnection = async (
  metricId: string,
  metricKey: string,
  dataSourceKey: string,
  metricConnectionId?: string
) => {
  if (!metricId || !metricKey || !dataSourceKey) return null;

  const userId = await getUserId();

  if (!userId) return null;

  if (metricConnectionId) {
    const existingGAMetricConnection = await prisma.metricConnection.findUnique(
      {
        where: { id: metricConnectionId },
      }
    );

    if (existingGAMetricConnection) {
      const updatedEntry = await prisma.metricConnection.update({
        where: { id: existingGAMetricConnection.id },
        data: { metric_key: metricKey },
      });
      return updatedEntry;
    }
  }

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
