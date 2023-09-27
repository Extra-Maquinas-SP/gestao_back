import { ProdutoRepository } from '../repository/produto.repository';

export class FindAllProdutosService {
  async execute() {
    const produtoRepository = new ProdutoRepository();

    const produtos = await produtoRepository.findAllProdutos();

    return produtos;
  }
}
