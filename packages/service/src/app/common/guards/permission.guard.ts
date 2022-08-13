import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTHORIZE_KEY_METADATA } from '../constants';
import { ApiException } from '../exceptions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { userId } = context.switchToHttp().getRequest();

    const authorize = this.reflector.get<boolean>(
      AUTHORIZE_KEY_METADATA,
      context.getHandler(),
    );
    // 设置了装饰器直接放开权限

    console.log(authorize, '=========');
    if (authorize) {
      return true;
    }

    if (!userId) {
      throw new ApiException(
        '您没有访问该接口的权限!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log(userId, 'userId=======================');
    return true;
  }
}
