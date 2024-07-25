/*
  Warnings:

  - Added the required column `data` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metric_type` to the `Metric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('manual', 'imported', 'custom');

-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_user_id_fkey";

-- DropIndex
DROP INDEX "User_role_key";

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "metric_type" "MetricType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MetricConnection" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "metric_id" TEXT NOT NULL,
    "source_platform" TEXT NOT NULL,
    "metric_key" TEXT NOT NULL,

    CONSTRAINT "MetricConnection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetricConnection" ADD CONSTRAINT "MetricConnection_metric_id_fkey" FOREIGN KEY ("metric_id") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;
