/*
  Warnings:

  - You are about to drop the column `produtos` on the `produtos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produto]` on the table `produtos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `produto` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_enderecoId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_status_leadsId_fkey";

-- DropForeignKey
ALTER TABLE "leads" DROP CONSTRAINT "leads_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_leads" DROP CONSTRAINT "usuarios_leads_leadsUsuarioId_fkey";

-- DropForeignKey
ALTER TABLE "usuarios_leads" DROP CONSTRAINT "usuarios_leads_usuarioId_fkey";

-- DropIndex
DROP INDEX "produtos_produtos_key";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "produtos",
ADD COLUMN     "produto" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produtos_produto_key" ON "produtos"("produto");

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_enderecoId_fkey" FOREIGN KEY ("enderecoId") REFERENCES "enderecos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_status_leadsId_fkey" FOREIGN KEY ("status_leadsId") REFERENCES "status_leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_leads" ADD CONSTRAINT "usuarios_leads_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuarios_leads" ADD CONSTRAINT "usuarios_leads_leadsUsuarioId_fkey" FOREIGN KEY ("leadsUsuarioId") REFERENCES "leads"("usuarioId") ON DELETE CASCADE ON UPDATE CASCADE;
