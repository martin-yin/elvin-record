import { ApiCode } from '@/common/enums';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({
    message: '名称是必不可少的',
    context: {
      code: ApiCode.USER_NAME_INVALID,
    },
  })
  readonly username: string;

  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
      context: {
        code: ApiCode.USER_EMAIL_INVALID,
      },
    },
  )
  @IsNotEmpty({
    message: '邮箱是必不可少的',
    context: {
      code: ApiCode.USER_EMAIL_INVALID,
    },
  })
  readonly email: string;

  @IsNotEmpty({
    message: '密码是必不可少的',
  })
  password: string;
}
