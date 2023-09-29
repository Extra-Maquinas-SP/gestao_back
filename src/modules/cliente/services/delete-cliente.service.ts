/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { ClienteRepository } from '../repository/cliente.repository';

export class DeleteClienteService {
  async execute(clienteId: number): Promise<object> {
    const clienteRepository = new ClienteRepository();

    const cliente = await clienteRepository.findOneCliente(clienteId);

    if (!cliente) {
      throw new BadRequestException(`Cliente não encontrado`);
    }

    return await clienteRepository.deleteCliente(clienteId);
  }
}
