import { ClienteRepository } from '../repository/cliente.repository';

export class FindAllClientesService {
  async execute() {
    const clienteRepository = new ClienteRepository();

    const clientes = await clienteRepository.findAllClientes();

    return clientes;
  }
}
