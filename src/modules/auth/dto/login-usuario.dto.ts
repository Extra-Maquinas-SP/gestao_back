import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O email do usuario.',
    example: 'tisp@extramaquinassp.com.br',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A senha do usuario.',
    example: 'Extra@2021',
  })
  senha: string;
}