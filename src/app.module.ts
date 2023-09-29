import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/service/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { ClienteModule } from './modules/cliente/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsuarioModule,
    ProdutoModule,
    ClienteModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
