import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from 'src/user/entities/user.entity';

export class RegisterDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  nomeUsuario: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  senha: string;

  @IsEnum(UserRole, { message: 'Role inválido' })
  role?: UserRole; // opcional; se não enviado, será USER por padrão
}

export class LoginDto {
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  nomeUsuario: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  senha: string;
}
