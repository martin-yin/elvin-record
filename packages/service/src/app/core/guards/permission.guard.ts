import { AuthService } from '@/app/admin/auth/auth.service';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZE_METADATA } from '../constants';
import { ApiException } from '../exceptions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const { userId } = context.switchToHttp().getRequest();
    const permissionList = this.reflector.get<
      Array<string | Array<string | null>>
    >(AUTHORIZE_METADATA, context.getHandler());
    // 不存在的权限直接放行
    if (!permissionList) {
      return true;
    }
    if (await this.authService.validatePerm(permissionList, userId)) {
      return true;
    }
    throw new ApiException('您没有权限访问该接口', HttpStatus.FORBIDDEN);
  }
}
