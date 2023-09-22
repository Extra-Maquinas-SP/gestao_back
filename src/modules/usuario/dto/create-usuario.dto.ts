import { ApiProperty } from '@nestjs/swagger';
import { Tipo_usuarios } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'O nome do usuario.',
    example: 'Anna Lívia',
  })
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 45)
  @ApiProperty({
    description: 'O e-mail do usuario.',
    example: 'annalivia@extramaquinassp.com.br',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha está fraca',
  })
  @ApiProperty({
    description: 'A senha do usuario',
    example: 'Extra@2021',
  })
  senha: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 45)
  @ApiProperty({
    description: 'O telefone do usuario.',
    example: '+5511913485372',
  })
  telefone: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Tipo_usuarios)
  @ApiProperty({
    description: 'Tipo de usuario que terá acesso ao sistema.',
    example: Tipo_usuarios.vendedor,
  })
  tipo: Tipo_usuarios;
}
