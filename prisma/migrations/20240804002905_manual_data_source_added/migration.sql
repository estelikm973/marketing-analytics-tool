/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_user_id_fkey";

-- DropIndex
DROP INDEX "User_role_key";

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "format" TEXT NOT NULL DEFAULT 'number';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MetricConnection" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metric_id" TEXT NOT NULL,
    "manual_data_source_id" TEXT,
    "data_source_connection_id" TEXT,
    "metric_key" TEXT,

    CONSTRAINT "MetricConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSource" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "hidden" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "DataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSourceConnection" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "data_source_key" TEXT NOT NULL,
    "account_name" TEXT NOT NULL DEFAULT '',
    "property_name" TEXT NOT NULL DEFAULT '',
    "access_token" TEXT,
    "expiry_date" BIGINT,
    "id_token" TEXT,
    "refresh_token" TEXT,
    "scope" TEXT,
    "token_type" TEXT,

    CONSTRAINT "DataSourceConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualDataSource" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ManualDataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManualEntry" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metric_connection_id" TEXT NOT NULL,
    "manual_data_source_id" TEXT NOT NULL,
    "value" BIGINT NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ManualEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DataSource_key_key" ON "DataSource"("key");

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricConnection" ADD CONSTRAINT "MetricConnection_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricConnection" ADD CONSTRAINT "MetricConnection_manual_data_source_id_fkey" FOREIGN KEY ("manual_data_source_id") REFERENCES "ManualDataSource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricConnection" ADD CONSTRAINT "MetricConnection_data_source_connection_id_fkey" FOREIGN KEY ("data_source_connection_id") REFERENCES "DataSourceConnection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceConnection" ADD CONSTRAINT "DataSourceConnection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataSourceConnection" ADD CONSTRAINT "DataSourceConnection_data_source_key_fkey" FOREIGN KEY ("data_source_key") REFERENCES "DataSource"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualDataSource" ADD CONSTRAINT "ManualDataSource_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualEntry" ADD CONSTRAINT "ManualEntry_metric_connection_id_fkey" FOREIGN KEY ("metric_connection_id") REFERENCES "MetricConnection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManualEntry" ADD CONSTRAINT "ManualEntry_manual_data_source_id_fkey" FOREIGN KEY ("manual_data_source_id") REFERENCES "ManualDataSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
