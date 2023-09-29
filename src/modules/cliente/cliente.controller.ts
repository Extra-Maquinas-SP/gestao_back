import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClienteService, FindAllClientesService } from './services';
import { LoggedUsuario } from '../auth/decorator/logged-usuario.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cliente } from './entities/cliente.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(
    private createClienteService: CreateClienteService,
    private findAllClientesService: FindAllClientesService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo cliente - (ABERTO).',
  })
  create(
    @Body() createClienteDto: CreateClienteDto,
    @LoggedUsuario() usuario: Usuario,
  ): Promise<Cliente> {
    return this.createClienteService.execute(createClienteDto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vizualizar todos os clientes - (SOMENTE GESTOR).',
  })
  findAll(@LoggedAdmin() usuario: Usuario) {
    return this.findAllClientesService.execute();
  }
}
