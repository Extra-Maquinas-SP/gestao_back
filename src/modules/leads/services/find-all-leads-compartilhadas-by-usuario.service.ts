import { Leads, UsuariosLeads } from '@prisma/client';
import { LeadsRepository } from '../repository/leads.repository';

export class FindAllLeadsCompartilhadasByUsuarioService {
  async execute(usuarioId: number): Promise<UsuariosLeads[]> {
    const leadsRepository = new LeadsRepository();

    const leads =
      await leadsRepository.findAllLeadsCompartilhadasByUsuario(usuarioId);

    return leads;
  }
}
