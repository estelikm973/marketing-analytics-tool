"use server";

import prisma from "@/lib/prisma";
import {
  getGoogleAnalyticsAccessData,
  getUserId,
  setGAPropertyIdCookies,
} from "./auth";
import {
  IDataSource,
  IDataSourceConnection,
  IManualDataSource,
} from "@/lib/types";
import { DataSourceKeys } from "@/data/platforms";
import { analyticsAdminClient, generateAuthUrl } from "@/lib/googleClient";

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

export const getGAPropertyAccount = async () => {
  const userId = await getUserId();

  if (!userId) return;

  const gaDataSourceConnection = await prisma.dataSourceConnection.findFirst({
    where: {
      user_id: userId,
      data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
    },
    select: { id: true, account_name: true, property_name: true },
  });

  if (!gaDataSourceConnection) return;

  return gaDataSourceConnection;
};

export const updateGAProperty = async (
  account_name: string,
  property_name: string
) => {
  const userId = await getUserId();

  if (!userId) return;

  const gaDataSourceConnection = await prisma.dataSourceConnection.findFirst({
    where: {
      user_id: userId,
      data_source_key: DataSourceKeys.GOOGLE_ANALYTICS,
    },
  });

  if (!gaDataSourceConnection) return;

  const updatedConnection = await prisma.dataSourceConnection.update({
    where: { id: gaDataSourceConnection.id },
    data: { property_name, account_name },
  });

  setGAPropertyIdCookies(property_name);

  return updatedConnection.id;
};

export const getAuthUrl = async () => {
  const userId = await getUserId();

  if (!userId) return;

  const authUrl = generateAuthUrl(userId);

  return authUrl;
};

export const getAccountList = async () => {
  try {
    const accessData = await getGoogleAnalyticsAccessData();

    if (!accessData || !accessData.access_token) return null;

    const { access_token } = accessData;

    const res = await analyticsAdminClient(access_token).listAccounts();

    return (
      res[0].map((el) => ({
        displayName: el.displayName || "-",
        name: el.name || "-",
      })) || []
    );
  } catch (err: any) {
    console.error(err?.message || "Server Error");
    return null;
  }
};

export const getPropertyList = async (accountName: string) => {
  try {
    const accessData = await getGoogleAnalyticsAccessData();

    if (!accessData || !accessData.access_token) return null;

    const { access_token } = accessData;

    const res = await analyticsAdminClient(access_token).listProperties({
      filter: `parent:${accountName}`,
    });

    return (
      res[0].map((el) => ({
        displayName: el.displayName || "-",
        name: el.name || "-",
      })) || []
    );
  } catch (err: any) {
    console.error(err?.message || "Server Error");
    return null;
  }
};

export const getManualDataSources: () => Promise<
  IManualDataSource[] | undefined
> = async () => {
  try {
    const userId = await getUserId();

    if (!userId) return;

    const manualDataSources: IManualDataSource[] =
      await prisma.manualDataSource.findMany({
        where: { user_id: userId },
      });

    // TODO: Remove this later and add ManualDataSource create function
    if (!manualDataSources.length) {
      const newManualDataSource: IManualDataSource =
        await prisma.manualDataSource.create({
          data: { user_id: userId, key: "default", name: "Manual" },
        });

      return [newManualDataSource];
    }

    return manualDataSources;
  } catch (err: any) {
    console.error(err?.message || "Server Error");
    return;
  }
};
