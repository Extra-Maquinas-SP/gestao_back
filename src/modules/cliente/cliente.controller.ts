import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateClienteService,
  DeleteClienteService,
  FindAllClientesService,
  FindOneClienteService,
  UpdateClienteService,
} from './services';
import { LoggedUsuario } from '../auth/decorator/logged-usuario.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cliente } from './entities/cliente.entity';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(
    private createClienteService: CreateClienteService,
    private findAllClientesService: FindAllClientesService,
    private findOneClienteService: FindOneClienteService,
    private updateClienteService: UpdateClienteService,
    private deleteClienteService: DeleteClienteService,
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

  @Get('search/:clienteId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vizualizar cliente pelo Id - (ABERTO).',
  })
  findOneCliente(
    @Param('clienteId') clienteId: number,
    @LoggedAdmin() usuario: Usuario,
  ) {
    return this.findOneClienteService.execute(clienteId);
  }

  @Patch('update/:clienteId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar cliente pelo Id - (ABERTO).',
  })
  updateCliente(
    @Param('clienteId') clienteId: number,
    @Body() updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    return this.updateClienteService.execute(clienteId, updateClienteDto);
  }

  @Delete('delete/:clienteId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Deletar o cliente pelo Id - (ABERTO).',
  })
  deleteCliente(@Param('clienteId') clienteId: number): Promise<object> {
    return this.deleteClienteService.execute(clienteId);
  }
}
