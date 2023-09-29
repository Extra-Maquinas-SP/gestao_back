import { ApiProperty } from '@nestjs/swagger';
import { Enderecos, Tipo_clientes } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome do cliente.',
    example: 'Wendel Bezerra',
  })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O tipo do documento do cliente.',
    example: Tipo_clientes.PF,
  })
  tipo: Tipo_clientes;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O documento do cliente.',
    example: '123.456.789-10',
  })
  documento: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O estado do cliente.',
    example: 'SP',
  })
  uf: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O municipio do cliente.',
    example: 'Sumaré',
  })
  municipio: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O bairro do cliente.',
    example: 'Nova Veneza',
  })
  bairro: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A rua do cliente.',
    example: 'KM',
  })
  rua: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O número da casa do cliente.',
    example: 111,
  })
  numero: number;

  @IsOptional()
  @ApiProperty({
    description: 'O complemento da casa do cliente (OPCIONAL).',
    example: 'Antigo Frango Assado',
  })
  complemento: string;
}
