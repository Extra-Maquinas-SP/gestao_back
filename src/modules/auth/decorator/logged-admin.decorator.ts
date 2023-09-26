import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Tipo_usuarios } from '@prisma/client';

export const LoggedAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const usuarioObject = request.user;

  if (usuarioObject.tipo === Tipo_usuarios.gestor) {
    delete usuarioObject.senha;

    return usuarioObject;
  } else {
    throw new UnauthorizedException(
      'Usuario não tem permissão para acessar esta rota!',
    );
  }
});
