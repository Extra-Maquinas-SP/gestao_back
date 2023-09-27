import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateProdutoService } from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProdutoController],
  providers: [PrismaService, CreateProdutoService],
})
export class ProdutoModule {}
