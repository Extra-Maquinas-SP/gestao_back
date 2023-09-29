import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/service/prisma.service';
import { CreateClienteService } from './services';
import { ClienteController } from './cliente.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ClienteController],
  providers: [PrismaService, CreateClienteService],
})
export class ClienteModule {}
