-- AlterTable
ALTER TABLE "leads" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "leads_pkey" PRIMARY KEY ("id");
