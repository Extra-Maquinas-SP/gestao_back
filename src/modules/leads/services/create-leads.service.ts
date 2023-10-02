import { Injectable } from '@nestjs/common';
import { Leads } from '@prisma/client';
import { CreateLeadsDto } from '../dto/create-leads.dto';
import { LeadsRepository } from '../repository/leads.repository';

@Injectable()
export class CreateLeadsService {
  async execute(data: CreateLeadsDto, usuarioId: number): Promise<Leads> {
    const leadsRepository = new LeadsRepository();

    const newLeads = await leadsRepository.createLeads(data, usuarioId);

    return newLeads;
  }
}
