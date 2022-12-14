import { Injectable, ExecutionContext, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiException } from '../exceptions';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    console.log(user, 'user');
    console.log(err, 'err');
    if (err || !user) {
      throw err || new ApiException('身份认证已过期', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
