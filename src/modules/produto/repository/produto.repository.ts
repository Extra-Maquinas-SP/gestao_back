import { PrismaClient } from '@prisma/client';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../entities/produto.entity';
import { handleError } from 'src/shared/utils/handle-error.util';
import { NotFoundException } from '@nestjs/common';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

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

  async findAllProdutos(): Promise<Produto[]> {
    const produtos = await this.produtos
      .findMany({
        include: {
          leads: true,
        },
      })
      .catch(handleError);

    if (produtos.length == 0) {
      throw new NotFoundException('Não há produtos cadastrados!');
    }

    return produtos;
  }

  async findOneProduto(produtoId: number): Promise<Produto> {
    const produto = await this.produtos
      .findFirst({
        where: { id: produtoId },
        include: {
          leads: true,
        },
      })
      .catch(handleError);

    if (!produto) {
      throw new NotFoundException(
        `Produto com Id '${produtoId}' não encontrado!`,
      );
    }

    return produto;
  }

  async updateProduto(
    produtoId: number,
    data: UpdateProdutoDto,
  ): Promise<Produto> {
    const updatedProduto = await this.produtos
      .update({
        where: { id: produtoId },
        data: {
          produto: data.produto,
          categoria: data.categoria,
          preco_tabela: data.preco_tabela,
        },
      })
      .catch(handleError);

    return updatedProduto;
  }

  async deleteProduto(produtoId: number): Promise<object> {
    await this.produtos
      .delete({
        where: { id: produtoId },
      })
      .catch(handleError);

    return { message: 'Produto deletado com sucesso.' };
  }
}
