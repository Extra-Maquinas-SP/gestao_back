// import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
// import { PageOptionsDto } from '../../../shared/pagination-dtos';
// import { SearchusuarioDto } from '../dto/search.dto';
// import { UpdateusuarioDto } from '../dto/update-usuario.dto';
// import { UpdateMyAccountDto } from '../dto/update-my-account.dto';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

export class UsuarioRepository extends PrismaClient {
  private usuarioSelect = {
    id: true,
    nome: true,
    email: true,
    senha: false,
    telefone: true,
    tipo: true,
    leads: true,
    leads_compartilhadas: true,
    created_at: true,
    updated_at: true,
  };
  async createusuario(data: CreateUsuarioDto): Promise<Usuario> {
    const newusuario = await this.usuarios
      .create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          telefone: data.telefone,
          tipo: data.tipo,
        },
      })
      .catch(handleError);

    delete newusuario.senha;

    return newusuario;
  }

  //   async findAllusuarios({ skip, order, orderByColumn, take }: PageOptionsDto) {
  //     const usuarios = await this.usuario
  //       .findMany({
  //         skip,
  //         take,
  //         orderBy: {
  //           [orderByColumn]: order,
  //         },
  //         where: { deleted: false },
  //         select: this.usuarioSelect,
  //       })
  //       .catch(handleError);

  //     if (usuarios.length === 0) {
  //       throw new NotFoundException('No a usuarios found');
  //     }

  //     return usuarios;
  //   }

  //   async getAllusuarios() {
  //     return this.usuario
  //       .findMany({
  //         where: {
  //           deleted: false,
  //         },
  //       })
  //       .catch(handleError);
  //   }

  //   async findOneusuario(usuarioId: number) {
  //     const usuario = await this.usuario
  //       .findFirst({
  //         where: { id: usuarioId, deleted: false },
  //         include: {
  //           institutions: true,
  //         },
  //       })
  //       .catch(handleError);

  //     if (!usuario) {
  //       throw new NotFoundException(`usuario with Id '${usuarioId}' not found!`);
  //     }

  //     delete usuario.passwordHash;

  //     delete usuario.deleted;

  //     return usuario;
  //   }

  async findOneByEmail(email: string): Promise<Usuario> {
    return this.usuarios.findFirst({
      where: {
        email,
      },
    });
  }

  //   async findByToken(token: string): Promise<usuario> {
  //     return this.usuario.findFirst({
  //       where: {
  //         recoverPasswordToken: token,
  //       },
  //     });
  //   }

  //   async searchusuarios(
  //     { skip, order, orderByColumn, take }: PageOptionsDto,
  //     searchusuarioDto: SearchusuarioDto,
  //   ) {
  //     return this.usuario
  //       .findMany({
  //         skip,
  //         take,
  //         orderBy: {
  //           [orderByColumn]: order,
  //         },
  //         where: {
  //           OR: [
  //             {
  //               name: {
  //                 contains: searchusuarioDto.search,
  //               },
  //               deleted: false,
  //             },
  //             {
  //               role: {
  //                 contains: searchusuarioDto.search,
  //               },
  //               deleted: false,
  //             },
  //             {
  //               email: {
  //                 contains: searchusuarioDto.search,
  //               },
  //               deleted: false,
  //             },
  //           ],
  //         },
  //       })
  //       .catch(handleError);
  //   }

  //   async updateusuario(usuarioId: number, data: UpdateusuarioDto): Promise<usuario> {
  //     await this.validationInstitutionExists(data);

  //     const updatedusuario = await this.usuario
  //       .update({
  //         where: { id: usuarioId },
  //         data: {
  //           name: data.name,
  //           email: data.email,
  //           role: data.role,
  //           institutions: {
  //             connect: data.institutions.map((id) => ({
  //               id,
  //             })),
  //           },
  //         },
  //       })
  //       .catch(handleError);

  //     delete updatedusuario.passwordHash;
  //     delete updatedusuario.deleted;

  //     return updatedusuario;
  //   }

  //   async updateMyAccount(usuarioId: number, { ...data }: UpdateMyAccountDto) {
  //     const updateMyAccount = await this.usuario
  //       .update({
  //         where: {
  //           id: usuarioId,
  //         },
  //         data,
  //       })
  //       .catch(handleError);

  //     delete updateMyAccount.passwordHash;
  //     delete updateMyAccount.deleted;
  //     delete updateMyAccount.role;

  //     return updateMyAccount;
  //   }

  //   async updatePassword(id: number, passwordHash: string): Promise<usuario> {
  //     const updatedusuario = await this.usuario.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         recoverPasswordToken: null,
  //         passwordHash,
  //       },
  //     });

  //     delete updatedusuario.passwordHash;

  //     return updatedusuario;
  //   }

  //   async deleteusuario(usuarioId: number): Promise<object> {
  //     await this.usuario
  //       .update({
  //         where: { id: usuarioId },
  //         data: {
  //           deleted: true,
  //         },
  //       })
  //       .catch(handleError);

  //     return { message: 'usuario deleted successfully' };
  //   }

  //   async validationInstitutionExists(data) {
  //     const institution = await this.institution.findFirst({
  //       where: {
  //         id: {
  //           in: data.institutions,
  //         },
  //         deleted: false,
  //       },
  //     });

  //     if (!institution) {
  //       throw new NotFoundException(
  //         `Institution(s) with Id(s) '${data.institutions}' not found! Please enter an Id(s) of an existing institution(s)!`,
  //       );
  //     }
  //   }
}
