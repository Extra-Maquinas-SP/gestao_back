import { Status_leads, UsuariosLeads } from '@prisma/client';
import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { Produto } from 'src/modules/produto/entities/produto.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

export class Leads {
  id?: number;
  usuario: Usuario;
  cliente: Cliente;
  produto: Produto;
  observasoes: string[];
  status: Status_leads;
  compartilhar: boolean;
  usuarios_compartilhados?: UsuariosLeads[];
  lembrete?: string[];
  created_at?: string | Date;
  updated_at?: string | Date;
}
