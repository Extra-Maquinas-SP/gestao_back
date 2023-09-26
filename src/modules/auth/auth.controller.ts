import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { LoggedUsuario } from './decorator/logged-usuario.decorator';
import { Usuario } from '../usuario/entities/usuario.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in-usuario')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Faça login, recebendo um token de validação',
  })
  LoginUsuario(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.authService.LoginUsuario(loginUsuarioDto);
  }

  @Get('/usuario-logged')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna o usuario logado no momento.',
  })
  Usuario(@LoggedUsuario() usuario: Usuario) {
    return usuario;
  }
}
