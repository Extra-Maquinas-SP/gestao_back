import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome do produto.',
    example: 'LW 300KV',
  })
  produto: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A categoria do produto.',
    example: 'Pá Carregadeira',
  })
  categoria: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O preço do produto.',
    example: 250000.0,
  })
  preco_tabela: number;
}
