import { Leads } from '@prisma/client';
import { LeadsRepository } from '../repository/leads.repository';

export class FindAllLeadsByUsuarioService {
  async execute(usuarioId: number): Promise<Leads[]> {
    const leadsRepository = new LeadsRepository();

    const leads = await leadsRepository.findAllLeadsByUsuario(usuarioId);

    return leads;
  }
}
