import { CompartilharLeadsDto } from '../dto/compartilhar-leads.dto';
import { LeadsRepository } from '../repository/leads.repository';

export class CompartilharLeadsService {
  async execute(usuarioId: number, data: CompartilharLeadsDto) {
    const leadsRepository = new LeadsRepository();

    const leadsCompartilhada = await leadsRepository.compartilharLeads(usuarioId, data);

    return leadsCompartilhada;
  }
}
