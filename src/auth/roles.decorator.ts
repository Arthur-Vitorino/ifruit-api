import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/user/entities/user.entity";

export const ROLES_KEYS = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEYS, roles);