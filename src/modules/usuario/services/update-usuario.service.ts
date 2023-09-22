import { BadRequestException } from '@nestjs/common';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRepository } from '../repository/usuario.repository';
import * as crypto from 'crypto';

export class UpdateUsuarioService {
  async execute(userID: number, data: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();

    const usuario = await usuarioRepository.findOneUsuario(userID);

    if (!usuario) {
      throw new BadRequestException(`Usuario não encontrado`);
    }

    data.senha = crypto.randomBytes(32).toString('hex');

    return await usuarioRepository.updateUsuario(userID, data);
  }
}
