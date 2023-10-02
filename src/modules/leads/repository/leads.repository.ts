import { Leads, PrismaClient, UsuariosLeads } from '@prisma/client';
import { CreateLeadsDto } from '../dto/create-leads.dto';
import { handleError } from 'src/shared/utils/handle-error.util';
import { NotFoundException } from '@nestjs/common';
import { CompartilharLeadsDto } from '../dto/compartilhar-leads.dto';

export class LeadsRepository extends PrismaClient {
  async createLeads(data: CreateLeadsDto, usuarioId: number): Promise<Leads> {
    const newLeads = await this.leads
      .create({
        data: {
          usuario: {
            connect: {
              id: usuarioId,
            },
          },
          cliente: {
            connect: {
              id: data.clienteId,
            },
          },
          produto: {
            connect: {
              id: data.produtoId,
            },
          },
          status: {
            connect: {
              id: 1,
            },
          },
        },
      })
      .catch(handleError);

    return newLeads;
  }

  async findAllLeads(): Promise<Leads[]> {
    const leads = await this.leads
      .findMany({
        include: {
          usuario: true,
          cliente: true,
          produto: true,
          status: true,
        },
      })
      .catch(handleError);

    if (leads.length == 0) {
      throw new NotFoundException('Não há leads cadastradas!');
    }

    return leads;
  }

  async findAllLeadsByUsuario(usuarioId: number): Promise<Leads[]> {
    const leads = await this.leads
      .findMany({
        where: {
          usuarioId,
        },
        include: {
          usuario: true,
          cliente: true,
          produto: true,
          status: true,
        },
      })
      .catch(handleError);

    if (leads.length == 0) {
      throw new NotFoundException('Não há leads cadastradas pelo usuario!');
    }

    return leads;
  }

  async compartilharLeads(usuarioId: number, data: CompartilharLeadsDto) {
    const lead = await this.leads.findFirst({
      where: {
        id: data.leadsId,
      },
    });

    if (lead.usuarioId !== usuarioId) {
      throw new NotFoundException('Usuario não é proprietario desta lead!');
    }

    const leadsCompartilhada = await this.leads
      .update({
        where: {
          id: data.leadsId,
        },
        data: {
          compartilhar: true,
          usuarios_compartilhados: {
            create: {
              usuario: {
                connect: {
                  id: data.usuarioId,
                },
              },
            },
          },
        },
      })
      .catch(handleError);

    return leadsCompartilhada;
  }

  async findAllLeadsCompartilhadasByUsuario(
    usuarioId: number,
  ): Promise<UsuariosLeads[]> {
    const leads = await this.usuariosLeads
      .findMany({
        where: {
          usuarioId,
        },
        include: {
          usuario: true,
          Leads: {
            include: {
              cliente: true,
              produto: true,
              status: true,
            }
          }
        }
      })
      .catch(handleError);

    if (leads.length == 0) {
      throw new NotFoundException('Não há leads compartilhadas com o usuario!');
    }

    return leads;
  }
}
