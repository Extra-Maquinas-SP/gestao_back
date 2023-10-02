/*
  Warnings:

  - You are about to drop the column `leadsUsuarioId` on the `usuarios_leads` table. All the data in the column will be lost.
  - Added the required column `leadsId` to the `usuarios_leads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "usuarios_leads" DROP CONSTRAINT "usuarios_leads_leadsUsuarioId_fkey";

-- DropIndex
DROP INDEX "leads_clienteId_key";

-- DropIndex
DROP INDEX "leads_produtoId_key";

-- DropIndex
DROP INDEX "leads_usuarioId_key";

-- AlterTable
ALTER TABLE "usuarios_leads" DROP COLUMN "leadsUsuarioId",
ADD COLUMN     "leadsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "usuarios_leads" ADD CONSTRAINT "usuarios_leads_leadsId_fkey" FOREIGN KEY ("leadsId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
