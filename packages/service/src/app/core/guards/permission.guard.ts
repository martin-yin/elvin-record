import { AuthService } from '@/app/admin/auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZE_METADATA } from '../constants';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const { userId } = context.switchToHttp().getRequest();
    const permissionList = this.reflector.get<
      Array<string | Array<string | null>>
    >(AUTHORIZE_METADATA, context.getHandler());
    // 不存在的权限直接放行
    if (!permissionList) {
      return true;
    }
    this.authService.validatePerm(permissionList, userId);

    return true;
  }
}
