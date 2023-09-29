/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { ClienteRepository } from '../repository/cliente.repository';
import { Cliente } from '../entities/cliente.entity';

export class FindOneClienteService {
  async execute(clienteId: number): Promise<Cliente> {
    const clienteRepository = new ClienteRepository();

    const cliente = await clienteRepository.findOneCliente(clienteId);

    if (!cliente) {
      throw new BadRequestException(`Cliente não encontrado`);
    }

    return cliente;
  }
}
