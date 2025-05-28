import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/user/entities/user.entity";
import { ROLES_KEYS } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>
        (ROLES_KEYS, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        if(!user || !user.rule) {
            throw new ForbiddenException('Voce nao tem permissao para acessar esse recurso');
        }

        const hasPermission = requiredRoles.some(role => user.role === role);

        if(!hasPermission) {
            throw new ForbiddenException('Voce precisa ter algum dos seguintes perfis: ${requiredRoles.join(',')}');
        }

        return true;
    }
}