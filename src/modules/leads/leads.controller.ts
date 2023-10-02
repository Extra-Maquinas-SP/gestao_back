import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUsuario } from '../auth/decorator/logged-usuario.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { Leads, UsuariosLeads } from '@prisma/client';
import {
  CompartilharLeadsService,
  CreateLeadsService,
  FindAllLeadsByUsuarioService,
  FindAllLeadsCompartilhadasByUsuarioService,
  FindAllLeadsService,
  FindOneLeadService,
  UpdateStatusLeadsService,
} from './services';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CompartilharLeadsDto } from './dto/compartilhar-leads.dto';
import { UpdateStatusLeadsDto } from './dto/update-status-leads.dto';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(
    private createLeadsService: CreateLeadsService,
    private findAllLeadsService: FindAllLeadsService,
    private findAllLeadsByUsuarioService: FindAllLeadsByUsuarioService,
    private findOneLeadService: FindOneLeadService,
    private updateStatusLeadsService: UpdateStatusLeadsService,
    private compartilharLeadsService: CompartilharLeadsService,
    private findAllLeadsCompartilhadasByUsuarioService: FindAllLeadsCompartilhadasByUsuarioService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo leads - (ABERTO).',
  })
  create(
    @Body() createLeadsDto: CreateLeadsDto,
    @LoggedUsuario() usuario: Usuario,
  ): Promise<Leads> {
    return this.createLeadsService.execute(createLeadsDto, usuario.id);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista de leads - (SOMENTE GESTOR).',
  })
  findAll(@LoggedAdmin() usuario: Usuario): Promise<Leads[]> {
    return this.findAllLeadsService.execute();
  }

  @Get('all-by-usuario')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista de leads pelo usuario logado - (ABERTO).',
  })
  findAllLeadsByUsuario(@LoggedUsuario() usuario: Usuario): Promise<Leads[]> {
    return this.findAllLeadsByUsuarioService.execute(usuario.id);
  }

  @Get('search/:leadsId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vizualizar leads pelo Id - (ABERTO).',
  })
  findOneLeads(
    @Param('leadsId') leadsId: number,
    @LoggedUsuario() usuario: Usuario,
  ): Promise<Leads> {
    return this.findOneLeadService.execute(leadsId);
  }

  @Patch('update-status-leads')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Atualizar o status da leads - (ABERTO).',
  })
  updateStatusLeads(
    @LoggedUsuario() usuario: Usuario,
    @Body() updateStatusLeadsDto: UpdateStatusLeadsDto,
  ): Promise<Leads> {
    return this.updateStatusLeadsService.execute(
      usuario.id,
      updateStatusLeadsDto,
    );
  }

  @Patch('compartilhar-leads')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Compartilhar leads com um usuario - (ABERTO).',
  })
  compartilharLeads(
    @LoggedUsuario() usuario: Usuario,
    @Body() createLeadsDto: CompartilharLeadsDto,
  ) {
    return this.compartilharLeadsService.execute(usuario.id, createLeadsDto);
  }

  @Get('all-compartilhadas-by-usuario')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista de leads compartilhadas com o usuario logado - (ABERTO).',
  })
  findAllLeadsCompartilhadasByUsuario(
    @LoggedUsuario() usuario: Usuario,
  ): Promise<UsuariosLeads[]> {
    return this.findAllLeadsCompartilhadasByUsuarioService.execute(usuario.id);
  }
}
