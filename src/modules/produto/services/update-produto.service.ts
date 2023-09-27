import { BadRequestException } from '@nestjs/common';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Produto } from '../entities/produto.entity';
import { ProdutoRepository } from '../repository/produto.repository';

export class UpdateProdutoService {
  async execute(produtoId: number, data: UpdateProdutoDto): Promise<Produto> {
    const produtoRepository = new ProdutoRepository();

    const produto = await produtoRepository.findOneProduto(produtoId);

    if (!produto) {
      throw new BadRequestException(`Produto não encontrado`);
    }

    return await produtoRepository.updateProduto(produtoId, data);
  }
}
