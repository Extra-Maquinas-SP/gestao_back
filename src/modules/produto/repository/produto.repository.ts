import { PrismaClient } from '@prisma/client';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../entities/produto.entity';
import { handleError } from 'src/shared/utils/handle-error.util';

export class ProdutoRepository extends PrismaClient {
  async createProduto(data: CreateProdutoDto): Promise<Produto> {
    const newProduto = await this.produtos
      .create({
        data: {
          produto: data.produto,
          categoria: data.categoria,
          preco_tabela: data.preco_tabela,
        },
      })
      .catch(handleError);

    return newProduto;
  }

  async findOneByProduto(produto: string): Promise<Produto> {
    return this.produtos.findFirst({
      where: {
        produto,
      },
    });
  }
}
