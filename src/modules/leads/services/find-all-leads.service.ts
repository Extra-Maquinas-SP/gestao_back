import { Leads } from '@prisma/client';
import { LeadsRepository } from '../repository/leads.repository';

export class FindAllLeadsService {
  async execute(): Promise<Leads[]> {
    const leadsRepository = new LeadsRepository();

    const leads = await leadsRepository.findAllLeads();

    return leads;
  }
}
