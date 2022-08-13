import { ApiCode } from '@/app/core/enums';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
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
  readonly password: string;
}
