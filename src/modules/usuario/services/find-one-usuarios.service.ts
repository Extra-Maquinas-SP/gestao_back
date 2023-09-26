import { BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';

export class FindOneUsuarioService {
  async execute(userId: number) {
    const usuarioRepository = new UsuarioRepository();

    const usuario = await usuarioRepository.findOneUsuario(userId);

    if (!usuario) {
      throw new BadRequestException(`Usuario não encontrado`);
    }

    return usuario;
  }
}
