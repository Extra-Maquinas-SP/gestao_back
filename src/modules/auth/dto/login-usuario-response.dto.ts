import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

export class LoginUserResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6Imd1dHMiLCJpYXQiOjE2NTQ4MjQwMDUsImV4cCI6MTY1NDkxMDQwNX0.d3wIQIyk5LqUMcyBYL-yunYNe7JyhMfKMyqP0joN00w',
  })
  token: string;

  @ApiProperty({
    description: 'Usuario autenticado',
  })
  user: Usuario;
}