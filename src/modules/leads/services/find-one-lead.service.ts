import { Leads } from '@prisma/client';
import { LeadsRepository } from '../repository/leads.repository';
import { NotFoundException } from '@nestjs/common';

export class FindOneLeadService {
  async execute(leadsId: number): Promise<Leads> {
    const leadsRepository = new LeadsRepository();

    const lead = await leadsRepository.findOneLead(leadsId);

    if (!lead) {
      throw new NotFoundException('Leads não encontrada!');
    }

    return lead;
  }
}
