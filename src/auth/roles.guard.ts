import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('User role:', user?.role);
    console.log('Allowed roles:', roles);

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied');
    }
    const allowed = roles.includes(user.role);

    if (!allowed) {
      throw new ForbiddenException('You are not admin!!!');
    }

    return allowed;
  }
}