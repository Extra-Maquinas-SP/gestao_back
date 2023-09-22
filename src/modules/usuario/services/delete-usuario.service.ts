import { BadRequestException } from '@nestjs/common';
import { UsuarioRepository } from '../repository/usuario.repository';

export class DeleteUsuarioService {
  async execute(userId: number): Promise<object> {
    const usuarioRepository = new UsuarioRepository();

    const usuario = await usuarioRepository.findOneUsuario(userId);

    if (!usuario) {
      throw new BadRequestException(`Usuario não encontrado`);
    }

    return await usuarioRepository.deleteUsuario(userId);
  }
}
