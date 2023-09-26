import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/service/prisma.service';
import { handleError } from '../../shared/utils/handle-error.util';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async LoginUsuario(loginUsuarioDto: LoginUsuarioDto) {
    const { email, senha } = loginUsuarioDto;

    const usuario = await this.prisma.usuarios
      .findFirst({
        where: {
          email: email,
        },
      })
      .catch(handleError);

    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    const isHashValid = await bcrypt.compare(senha, usuario.senha);

    if (!isHashValid) {
      throw new UnauthorizedException('Email ou senha inválidos!');
    }

    delete usuario.senha;

    return {
      token: this.jwt.sign({ email }),
      usuario,
    };
  }
}
