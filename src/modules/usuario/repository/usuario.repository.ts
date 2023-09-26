import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
// import { PageOptionsDto } from '../../../shared/pagination-dtos';
// import { SearchusuarioDto } from '../dto/search.dto';
// import { UpdateusuarioDto } from '../dto/update-usuario.dto';
// import { UpdateMyAccountDto } from '../dto/update-my-account.dto';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';

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
  async createUsuario(data: CreateUsuarioDto): Promise<Usuario> {
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

  async findAllUsuarios() {
    const usuarios = await this.usuarios
      .findMany({ include: { leads: true, leads_compartilhadas: true } })
      .catch(handleError);

    const usuariosComLeads = usuarios.map((usuario) => {
      const { senha, ...dadosUsuarioSemSenha } = usuario;

      return {
        ...dadosUsuarioSemSenha,
      };
    });

    return usuariosComLeads;
  }

  async findOneUsuario(usuarioId: number) {
    const usuario = await this.usuarios
      .findFirst({
        where: { id: usuarioId },
        include: {
          leads: true,
          leads_compartilhadas: true,
        },
      })
      .catch(handleError);

    if (!usuario) {
      throw new NotFoundException(
        `Usuario com Id '${usuarioId}' não encontrado!`,
      );
    }

    delete usuario.senha;

    return usuario;
  }

  async findOneByEmail(email: string): Promise<Usuario> {
    return this.usuarios.findFirst({
      where: {
        email,
      },
    });
  }

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

  async updateUsuario(
    usuarioId: number,
    data: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const updatedUsuario = await this.usuarios
      .update({
        where: { id: usuarioId },
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          telefone: data.telefone,
          tipo: data.tipo,
        },
      })
      .catch(handleError);

    delete updatedUsuario.senha;

    return updatedUsuario;
  }

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

  async deleteUsuario(usuarioId: number): Promise<object> {
    await this.usuarios
      .delete({
        where: { id: usuarioId },
      })
      .catch(handleError);

    return { message: 'Usuario deletado com sucesso.' };
  }

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
