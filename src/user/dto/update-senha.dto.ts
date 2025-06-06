import { IsString, MinLength } from 'class-validator';

export class UpdateSenhaDto {
  @IsString()
  senhaAtual: string;

  @IsString()
  @MinLength(6)
  novaSenha: string;
}
