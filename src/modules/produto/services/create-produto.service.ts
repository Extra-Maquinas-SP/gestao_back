import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { Produto } from '../entities/produto.entity';
import { ProdutoRepository } from '../repository/produto.repository';

@Injectable()
export class CreateProdutoService {
  async execute(data: CreateProdutoDto): Promise<Produto> {
    const produtoRepository = new ProdutoRepository();

    const produtoAllreadyExists = await produtoRepository.findOneByProduto(
      data.produto,
    );

    if (produtoAllreadyExists) {
      throw new BadRequestException(`Produto ${data.produto} existe!`);
    }

    const newProduto = await produtoRepository.createProduto(data);

    return newProduto;
  }
}
