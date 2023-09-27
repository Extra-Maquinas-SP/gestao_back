import { Leads } from '@prisma/client';

export class Produto {
  id?: number;
  produto: string;
  categoria: string;
  preco_tabela: number;
  leads?: Leads[];
  created_at?: string | Date;
  updated_at?: string | Date;
}
