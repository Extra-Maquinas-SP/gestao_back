import { BadRequestException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { UsuarioRepository } from '../repository/usuario.repository';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class CreateUsuarioService {
  async execute(data: CreateUsuarioDto): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();

    const usuarioAllreadyExists = await usuarioRepository.findOneByEmail(
      data.email,
    );

    if (usuarioAllreadyExists) {
      throw new BadRequestException(`Usuario ${data.email} existe!`);
    }

    data.senha = crypto.randomBytes(32).toString('hex');

    const newusuario = await usuarioRepository.createusuario(data);

    return newusuario;
  }
}
