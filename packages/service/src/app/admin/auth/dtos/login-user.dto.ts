import { ApiCode } from '@/app/common/enums';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({
    message: '用户名称是必不可少的',
    context: {
      code: ApiCode.USER_NAME_INVALID,
    },
  })
  readonly username: string;

  @IsNotEmpty({
    message: '密码是必不可少的',
  })
  readonly password: string;

  readonly rememberMe: boolean;
}
