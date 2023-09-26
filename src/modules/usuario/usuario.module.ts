import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../../prisma/service/prisma.service';
import {
  CreateUsuarioService,
  FindAllUsuariosService,
  FindOneUsuarioService,
  UpdateUsuarioService,
  DeleteUsuarioService,
} from './services';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UsuarioController],
  providers: [
    PrismaService,
    CreateUsuarioService,
    FindAllUsuariosService,
    FindOneUsuarioService,
    UpdateUsuarioService,
    DeleteUsuarioService,
  ],
})
export class UsuarioModule {}
