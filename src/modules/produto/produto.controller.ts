import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProdutoService } from './services';
import { AuthGuard } from '@nestjs/passport';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { Produto } from './entities/produto.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';

@ApiTags('Produto')
@Controller('produto')
export class ProdutoController {
  constructor(private createProdutoService: CreateProdutoService) {}

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
}
