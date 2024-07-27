"use server";

import prisma from "@/lib/prisma";
import { getUserId } from "./auth";
import { IDataSource, IDataSourceConnection } from "@/lib/types";
import { DataSourceKeys } from "@/data/platforms";

export const getDataSources = async () => {
  try {
    const userId = await getUserId();

    if (!userId) {
      return null;
    }

    const allDataSources: IDataSource[] = await prisma.dataSource.findMany({
      where: { hidden: false },
    });

    if (!allDataSources) return null;

    const connectedDataSources = await prisma.dataSourceConnection.findMany({
      where: { user_id: userId },
      include: { data_source: true },
    });

    if (!connectedDataSources) return null;

    const nonConnectedDataSources: IDataSource[] = [];

    allDataSources.forEach((el) => {
      if (
        !connectedDataSources.some(
          (connectedDS) => connectedDS.data_source_key === el.key
        )
      ) {
        nonConnectedDataSources.push(el);
      }
    });

    return { connectedDataSources, nonConnectedDataSources };
  } catch (err: any) {
    console.log(err?.message || "Error fetching data sources");
    return null;
  }
};

export const getMyDataSourceConnections = async () => {
  try {
    const userId = await getUserId();

    if (!userId) {
      console.log("no user id");
      return [];
    }

    const myDataSourceConnections: IDataSourceConnection[] =
      await prisma.dataSourceConnection.findMany({
        where: { user_id: userId },
        include: { data_source: true },
      });

    return myDataSourceConnections || [];
  } catch (err: any) {
    console.log(err?.message || "Error fetching data sources");
    return [];
  }
};

export const disconnectGADataSource = async () => {
  try {
    const userId = await getUserId();

    if (!userId) return null;

    const dataSourceConnection = await prisma.dataSourceConnection.findFirst({
      where: {
        user_id: userId,
        data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
      },
    });

    if (!dataSourceConnection) return null;

    const deletedConnection = await prisma.dataSourceConnection.delete({
      where: { id: dataSourceConnection.id },
    });

    return deletedConnection;
  } catch (err: any) {
    console.log(err?.message || "Server Error");
    return null;
  }
};
