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
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { LoggedUsuario } from '../auth/decorator/logged-usuario.decorator';
import { LoggedAdmin } from '../auth/decorator/logged-admin.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import {
  CreateUsuarioService,
  FindAllUsuariosService,
  FindOneUsuarioService,
  UpdateUsuarioService,
  DeleteUsuarioService,
} from './services';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(
    private createUsuarioService: CreateUsuarioService,
    private findAllUsuariosService: FindAllUsuariosService,
    private findOneUsuarioService: FindOneUsuarioService,
    private updateUsuarioService: UpdateUsuarioService,
    private deleteUsuarioService: DeleteUsuarioService,
  ) {}

  @Post('create')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo usuario - (SOMENTE GESTOR).',
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.createUsuarioService.execute(createUsuarioDto);
  }

  @Get('all')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lista de usuarios - (SOMENTE GESTOR).',
  })
  findAll(@LoggedAdmin() usuario: Usuario) {
    return this.findAllUsuariosService.execute();
  }

  @Get('search/:usuarioID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vizualizar usuario pelo Id - (ABERTO).',
  })
  findOneUsuario(@Param('usuarioID') usuarioId: number) {
    return this.findOneUsuarioService.execute(usuarioId);
  }

  //   @Post('/search')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: `View a usuario by name, role or email - (FOR ADMIN).`,
  //   })
  //   @HttpCode(HttpStatus.OK)
  //   searchusuarios(
  //     @LoggedAdmin() usuario: usuario,
  //     @Query() query: PageOptionsDto,
  //     @Body() searchusuarioDto: SearchusuarioDto,
  //   ) {
  //     return this.searchusuariosService.execute(query, searchusuarioDto);
  //   }

  @Patch('update/:usuarioID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Editar usuario pelo Id - (ABERTO).',
  })
  updateUsuario(
    // @LoggedAdmin() usuario: usuario,
    @Param('usuarioID') usuarioId: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    return this.updateUsuarioService.execute(usuarioId, updateUsuarioDto);
  }

  //   @Patch('update-my-account')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: 'Edit a usuario logged - (FOR ALL usuarioS).',
  //   })
  //   updateMyAccount(
  //     @Loggedusuario() usuario: usuario,
  //     @Body() updateMyAccountDto: UpdateMyAccountDto,
  //   ) {
  //     return this.updateMyAccountService.execute(usuario.id, updateMyAccountDto);
  //   }

  @Delete('delete/:usuarioID')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar o usuario pelo Id - (SOMENTE GESTOR).',
  })
  deleteUsuario(
    @LoggedAdmin() usuario: Usuario,
    @Param('usuarioID') usuarioId: number,
  ): Promise<object> {
    return this.deleteUsuarioService.execute(usuarioId);
  }
}
