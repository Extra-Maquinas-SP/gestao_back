import { Module } from '@nestjs/common';
import { LeadsController } from './leads.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'prisma/service/prisma.service';
import {
  CompartilharLeadsService,
  CreateLeadsService,
  FindAllLeadsByUsuarioService,
  FindAllLeadsCompartilhadasByUsuarioService,
  FindAllLeadsService,
  FindOneLeadService,
  UpdateStatusLeadsService,
} from './services';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [LeadsController],
  providers: [
    PrismaService,
    CreateLeadsService,
    FindAllLeadsService,
    FindAllLeadsByUsuarioService,
    FindOneLeadService,
    UpdateStatusLeadsService,
    CompartilharLeadsService,
    FindAllLeadsCompartilhadasByUsuarioService,
  ],
})
export class LeadsModule {}
