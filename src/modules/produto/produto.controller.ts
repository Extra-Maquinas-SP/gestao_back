import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateProdutoService,
  DeleteProdutoService,
  FindAllProdutosService,
  FindOneProdutoService,
  UpdateProdutoService,
} from './services';
import { AuthGuard } from '@nestjs/passport';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './entities/produto.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(
    private createProdutoService: CreateProdutoService,
    private findAllProdutosService: FindAllProdutosService,
    private findOneProdutoService: FindOneProdutoService,
    private updateProdutoService: UpdateProdutoService,
    private deleteProdutoService: DeleteProdutoService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo produto - (SOMENTE GESTOR).',
  })
  create(
    @Body() createProdutoDto: CreateProdutoDto,
    @LoggedAdmin() usuario: Usuario,
  ): Promise<Produto> {
    return this.createProdutoService.execute(createProdutoDto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista de produtos - (SOMENTE GESTOR).',
  })
  findAll(@LoggedAdmin() usuario: Usuario) {
    return this.findAllProdutosService.execute();
  }

  @Get('search/:produtoId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vizualizar produto pelo Id - (SOMENTE GESTOR).',
  })
  findOneProduto(
    @Param('produtoId') produtoId: number,
    @LoggedAdmin() usuario: Usuario,
  ) {
    return this.findOneProdutoService.execute(produtoId);
  }

  @Patch('update/:produtoId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar produto pelo Id - (SOMENTE GESTOR).',
  })
  updateProduto(
    // @LoggedAdmin() usuario: usuario,
    @Param('produtoId') produtoId: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.updateProdutoService.execute(produtoId, updateProdutoDto);
  }

  @Delete('delete/:produtoId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar o produto pelo Id - (SOMENTE GESTOR).',
  })
  deleteProduto(
    @LoggedAdmin() usuario: Usuario,
    @Param('produtoId') produtoId: number,
  ): Promise<object> {
    return this.deleteProdutoService.execute(produtoId);
  }
}
