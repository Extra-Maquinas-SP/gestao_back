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
// import { Loggedusuario } from '../auth/decorator/logged-usuario.decorator';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioService } from './services';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(private createUsuarioService: CreateUsuarioService) {}

  @Post('create')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  @ApiOperation({
    summary: 'Criar novo usuario - (SOMENTE GESTOR).',
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.createUsuarioService.execute(createUsuarioDto);
  }

  //   @Get('all')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: 'List all usuarios - (FOR ADMIN).',
  //   })
  //   findAll(@LoggedAdmin() usuario: usuario, @Query() query: PageOptionsDto) {
  //     return this.findAllusuariosServices.execute(query);
  //   }

  //   @Get('search/:usuarioID')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: 'View a usuario by Id - (FOR ADMIN).',
  //   })
  //   findOneusuario(
  //     @LoggedAdmin() usuario: usuario,
  //     @Param('usuarioID') usuarioId: number,
  //   ) {
  //     return this.findOneusuarioService.execute(usuarioId);
  //   }

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

  //   @Patch('update/:usuarioID')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @ApiOperation({
  //     summary: 'Edit a usuario by Id - (FOR ADMIN).',
  //   })
  //   updateusuario(
  //     @LoggedAdmin() usuario: usuario,
  //     @Param('usuarioID') usuarioId: number,
  //     @Body() updateusuarioDto: UpdateusuarioDto,
  //   ): Promise<usuario> {
  //     return this.updateusuarioService.execute(usuarioId, updateusuarioDto);
  //   }

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

  //   @Patch('update_password')
  //   @ApiOperation({
  //     summary: 'usuario update password- (FOR ALL usuarioS).',
  //   })
  //   updatePassword(
  //     @Body() updatePassword: CreatePasswordHashDto,
  //   ): Promise<usuario> {
  //     return this.updatePasswordByEmailService.execute(updatePassword);
  //   }

  //   @Delete('delete/:usuarioID')
  //   @UseGuards(AuthGuard())
  //   @ApiBearerAuth()
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   @ApiOperation({
  //     summary: 'Remove a usuario by Id - (FOR ADMIN).',
  //   })
  //   deleteusuario(
  //     @LoggedAdmin() usuario: usuario,
  //     @Param('usuarioID') usuarioId: number,
  //   ): Promise<object> {
  //     return this.deleteusuarioService.execute(usuarioId);
  //   }
}
