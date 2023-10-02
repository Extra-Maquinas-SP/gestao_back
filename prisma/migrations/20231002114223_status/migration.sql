/*
  Warnings:

  - Added the required column `status` to the `status_leads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "status_leads" ADD COLUMN     "status" TEXT NOT NULL;
