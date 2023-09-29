import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { ClienteRepository } from '../repository/cliente.repository';

@Injectable()
export class CreateClienteService {
  async execute(data: CreateClienteDto): Promise<Cliente> {
    const clienteRepository = new ClienteRepository();

    const clienteAllreadyExists = await clienteRepository.findOneByDocumento(
      data.documento,
    );

    if (clienteAllreadyExists) {
      throw new BadRequestException(
        `Cliente com documento ${data.documento} existe!`,
      );
    }

    const newCliente = await clienteRepository.createCliente(data);

    return newCliente;
  }
}
