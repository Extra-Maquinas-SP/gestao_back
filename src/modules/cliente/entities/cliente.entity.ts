import { Enderecos, Leads, Tipo_clientes } from '@prisma/client';

export class Cliente {
  id?: number;
  nome: string;
  tipo: Tipo_clientes;
  documento: string;
  endereco?: Enderecos;
  enderecoId?: number;
  leads?: Leads[];
  created_at?: string | Date;
  updated_at?: string | Date;
}
