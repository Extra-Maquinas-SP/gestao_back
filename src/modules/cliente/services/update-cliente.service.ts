/* eslint-disable prettier/prettier */
import { BadRequestException } from '@nestjs/common';
import { ClienteRepository } from '../repository/cliente.repository';
import { Cliente } from '../entities/cliente.entity';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

export class UpdateClienteService {
  async execute(clienteId: number, data: UpdateClienteDto): Promise<Cliente> {
    const clienteRepository = new ClienteRepository();

    const cliente = await clienteRepository.findOneCliente(clienteId);

    if (!cliente) {
      throw new BadRequestException(`Cliente não encontrado`);
    }

    return await clienteRepository.updateCliente(clienteId, data);
  }
}
