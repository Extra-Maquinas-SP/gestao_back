import { Leads } from '@prisma/client';
import { UpdateStatusLeadsDto } from '../dto/update-status-leads.dto';
import { LeadsRepository } from '../repository/leads.repository';

export class UpdateStatusLeadsService {
  async execute(usuarioId: number, data: UpdateStatusLeadsDto): Promise<Leads> {
    const leadsRepository = new LeadsRepository();

    const statusLeads = await leadsRepository.updateStatusLeads(
      usuarioId,
      data,
    );

    return statusLeads;
  }
}
