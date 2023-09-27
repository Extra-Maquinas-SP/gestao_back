import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ProdutoController } from './produto.controller';
import { PrismaService } from 'prisma/service/prisma.service';
import {
  CreateProdutoService,
  DeleteProdutoService,
  FindAllProdutosService,
  FindOneProdutoService,
  UpdateProdutoService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ProdutoController],
  providers: [
    PrismaService,
    CreateProdutoService,
    FindAllProdutosService,
    FindOneProdutoService,
    UpdateProdutoService,
    DeleteProdutoService,
  ],
})
export class ProdutoModule {}
