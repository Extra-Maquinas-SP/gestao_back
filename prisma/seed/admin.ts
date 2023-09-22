import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  await Promise.all([
    await prisma.$queryRaw(
      Prisma.sql`INSERT INTO Usuarios (id,nome,email,senha,telefone, tipo)
    VALUES
      (1,"Gustavo Martins", "tisp@extramaquinassp.com.br","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W", "+5519992599246", "gestor"),
      (2,"Julia Téles", "dev1@extramaquinassp.com.br","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W", "+5519992599246", "gestor"),
      (3,"André Neder", "admin@extramaquinassp.com.br","$2a$10$6EgPRZqqBJIzIya.NknvZeJA9MN20EjSvfWgZwkf.Z6KYTM9eJm9W", "+5519992599246", "gestor")`,
    ),
  ]);

  console.log(`Seeding admin finished.`);
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
