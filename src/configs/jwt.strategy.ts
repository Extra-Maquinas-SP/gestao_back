import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'prisma/service/prisma.service';
import { handleError } from 'src/shared/utils/handle-error.util';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { email: string }) {
    const usuario = await this.prisma.usuarios
      .findFirst({
        where: { email: payload.email },
      })
      .catch(handleError);

    if (!usuario) {
      throw new UnauthorizedException('Usuario não existe ou não autorizado!');
    }

    if (usuario) {
      delete usuario.senha;
      return usuario;
    }
  }
}
