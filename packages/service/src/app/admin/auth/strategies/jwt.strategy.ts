import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenPayload } from '@/common/interfaces';
import { ElConfigService } from '@/common/services';
import { UserEntity } from '../../users/entity/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private elConfigService: ElConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: elConfigService.jwtSecret,
    });
  }

  async validate(payload: TokenPayload): Promise<UserEntity> {
    return this.userService.verifyToken(payload);
  }
}
