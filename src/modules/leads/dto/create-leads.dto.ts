import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLeadsDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O id do cliente.',
    example: 1,
  })
  clienteId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O id do produto.',
    example: 1,
  })
  produtoId: number;
}
