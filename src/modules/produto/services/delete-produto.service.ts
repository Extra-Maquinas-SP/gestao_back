import { BadRequestException } from '@nestjs/common';
import { ProdutoRepository } from '../repository/produto.repository';

export class DeleteProdutoService {
  async execute(produtoId: number): Promise<object> {
    const produtoRepository = new ProdutoRepository();

    const produto = await produtoRepository.findOneProduto(produtoId);

    if (!produto) {
      throw new BadRequestException(`Produto não encontrado`);
    }

    return await produtoRepository.deleteProduto(produtoId);
  }
}
