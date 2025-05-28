import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { nomeUsuario: dto.nomeUsuario },
    });
    
    if (!user || !(await bcrypt.compare(dto.senha, user.senha))) {
      throw new UnauthorizedException('Credenciais Invalidas');
    }
    const payload = { 
      sub: user.id, 
      nomeUsuario: user.nomeUsuario,
      role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validadeUser(nomeUsuario: string, senha: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { nomeUsuario }
    });
    if(user && (await bcrypt.compare(senha, user.senha))) {
      return user;
    }
    return null;
  }
}