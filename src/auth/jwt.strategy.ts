import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private usersService: UserService) {
            super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: 'secretKey',
            });
        }

        async validate(payload: any) {
          const user = await this.usersService.findOne(payload.sub);

  if (!user) {
    throw new UnauthorizedException('Usuário não encontrado');
  }

  return { 
    userId: user.id,
    nomeUsuario: user.nomeUsuario,
    role: user.role
  };
}
}