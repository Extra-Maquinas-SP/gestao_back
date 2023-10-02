import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Iniciando seeding ...`);
  await Promise.all([
    await prisma.$queryRaw(
      Prisma.sql`INSERT INTO usuarios (id, nome, email, senha, telefone, tipo)
      VALUES
        (4, 'Gustavo Martins', 'tisp@extramaquinassp.com.br', '$2b$10$t2T0vCYkdb3mBzUh9Zw8Tui9X8v4He/4ET/BNCfR.b4ug0GAcKykG', '+5519992599246', 'gestor'),
        (2, 'Julia Téles', 'dev1@extramaquinassp.com.br', '$2b$10$t2T0vCYkdb3mBzUh9Zw8Tui9X8v4He/4ET/BNCfR.b4ug0GAcKykG', '+5519989182626', 'gestor'),
        (3, 'André Neder', 'admin@extramaquinassp.com.br', '$2b$10$t2T0vCYkdb3mBzUh9Zw8Tui9X8v4He/4ET/BNCfR.b4ug0GAcKykG', '+5565999106432', 'gestor');`,
    ),
    await prisma.$queryRaw(
      Prisma.sql`INSERT INTO status_leads (id, status)
      VALUES
        (1, 'Novo Negocio'), (2, 'Em andamento'), (3, 'Proposta Enviada'), (4, 'Aguardando Documentos para Analise'), (5, 'Em Analise Bancária'), (6, 'Vendas Perdidas'), (7, 'Venda Realizada');`,
    ),
  ]);

  console.log(`Seeding finalizado.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
