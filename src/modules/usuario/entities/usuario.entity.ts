import { Leads, Tipo_usuarios, UsuariosLeads } from '@prisma/client';

export class Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  tipo: Tipo_usuarios;
  leads?: Leads[];
  leads_compartilhadas?: UsuariosLeads[];
  created_at?: string | Date;
  updated_at?: string | Date;
}
