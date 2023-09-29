import { PrismaClient } from '@prisma/client';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { handleError } from 'src/shared/utils/handle-error.util';
import { NotFoundException } from '@nestjs/common';

export class ClienteRepository extends PrismaClient {
  async createCliente(data: CreateClienteDto): Promise<Cliente> {
    const newCliente = await this.clientes
      .create({
        data: {
          nome: data.nome,
          tipo: data.tipo,
          documento: data.documento,
          endereco: {
            create: {
              uf: data.uf,
              municipio: data.municipio,
              bairro: data.bairro,
              rua: data.rua,
              numero: data.numero,
              complemento: data.complemento,
            },
          },
        },
      })
      .catch(handleError);

    return newCliente;
  }

  async findOneByDocumento(documento: string): Promise<Cliente> {
    return this.clientes.findFirst({
      where: {
        documento,
      },
    });
  }

  async findAllClientes(): Promise<Cliente[]> {
    const clientes = await this.clientes.findMany({
      include: {
        leads: true,
      },
    });

    if (clientes.length == 0) {
      throw new NotFoundException('Não há clientes cadastrados!');
    }

    return clientes;
  }
}
