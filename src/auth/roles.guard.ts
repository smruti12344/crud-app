import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole as Role } from '../user/user.type';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userRole: any = user?.role;
    console.log('RolesGuard: Required roles for this route:', user);
    console.table('RolesGuard: Required roles for this route:', requiredRoles);
    console.log('RolesGuard: User role from JWT payload:', userRole);
    return requiredRoles.includes(userRole);
  }
}
