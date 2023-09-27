import { BadRequestException } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoRepository } from '../repository/produto.repository';

export class FindOneProdutoService {
  async execute(produtoId: number): Promise<Produto> {
    const produtoRepository = new ProdutoRepository();

    const produto = await produtoRepository.findOneProduto(produtoId);

    if (!produto) {
      throw new BadRequestException(`Produto não encontrado`);
    }

    return produto;
  }
}
