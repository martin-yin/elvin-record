import { TokenPayload } from '@/app/common/interfaces';
import { CanActivate, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { UserEntity } from '../../users/entity/user.entity';
import { UsersService } from '../../users/users.service';

// @Injectable()
// export class PermissionStrategy extends CanActivate(Strategy, 'permission') {
//   constructor(private userService: UsersService) {
//     super();
//   }

//   async validate(payload: TokenPayload): Promise<boolean> {
//     console.log(payload, 'payload');
//     return true;
//   }
// }
