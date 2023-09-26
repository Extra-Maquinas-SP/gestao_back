import { UsuarioRepository } from '../repository/usuario.repository';

export class FindAllUsuariosService {
  async execute() {
    const usuarioRepository = new UsuarioRepository();

    const usuarios = await usuarioRepository.findAllUsuarios();

    return usuarios;
  }
}
