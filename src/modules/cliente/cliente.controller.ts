import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateClienteService } from './services';
import { LoggedUsuario } from '../auth/decorator/logged-usuario.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthGuard } from '@nestjs/passport';
import { Cliente } from './entities/cliente.entity';

@ApiTags('Cliente')
@Controller('cliente')
export class ClienteController {
  constructor(private createClienteService: CreateClienteService) {}

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
}
