import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Request } from 'express';
import { TokenPayload } from '@/app/core/interfaces';
import { ElConfigService } from '@/app/core/services';
import { UserEntity } from '../../users/entity/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private elConfigService: ElConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: elConfigService.jwtRefreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenPayload): Promise<UserEntity> {
    const refreshToken = request.headers.authorization.split(' ')[1];
    return this.userService.verifyRefreshToken(refreshToken, payload.userId);
  }
}
