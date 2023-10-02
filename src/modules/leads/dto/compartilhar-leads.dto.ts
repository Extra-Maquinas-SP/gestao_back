import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompartilharLeadsDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O id da leads a ser compartilhada com o Usuario.',
    example: 1,
  })
  leadsId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O id do usuario a ser compartilhada a Lead.',
    example: 2,
  })
  usuarioId: number;
}
